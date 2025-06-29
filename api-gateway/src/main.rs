use std::sync::Arc;

use aide::{axum::ApiRouter, openapi::OpenApi, transform::TransformOpenApi};
use axum::{Extension, middleware};
use axum_reverse_proxy::ReverseProxy;
use docs::docs_routes;
use error::AppError;
use metrics::{start_metrics_server, track_metrics};
use state::AppState;
use tower_http::cors::CorsLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod docs;
mod error;
mod events;
mod metrics;
mod state;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    aide::generate::on_error(|error| tracing::error!("{error}"));
    aide::generate::extract_schemas(true);

    tokio::join!(start_main_server(), start_metrics_server());
}

async fn start_main_server() {
    let state = AppState::from_dotenv().unwrap();
    let mut api = OpenApi::default();

    let community_service = std::env::var("COMMUNITY_SERVICE_HOST")
        .map_err(|_| AppError::EnvironmentVariable("COMMUNITY_SERVICE_HOST"))
        .unwrap();

    let content_service = std::env::var("CONTENT_SERVICE_HOST")
        .map_err(|_| AppError::EnvironmentVariable("CONTENT_SERVICE_HOST"))
        .unwrap();

    let app = ApiRouter::new()
        .nest_api_service("/docs", docs_routes(state.clone()))
        .nest_api_service(
            "/v1",
            ApiRouter::new()
                .merge(auth::routes(state.clone()))
                .merge(events::routes(state.clone())),
        )
        .finish_api_with(&mut api, api_docs)
        .layer(Extension(Arc::new(api)))
        .merge(ReverseProxy::new(
            "/proxied/community",
            &format!("http://{community_service}"),
        ))
        .merge(ReverseProxy::new(
            "/proxied/content",
            &format!("http://{content_service}"),
        ))
        .route_layer(middleware::from_fn(track_metrics))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let host = std::env::var("HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or("3000".to_string());
    let addr = format!("{host}:{port}");

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    tracing::debug!("listening on http://{}", listener.local_addr().unwrap());
    tracing::debug!(
        "documentation available at http://{}/docs",
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}

fn api_docs(api: TransformOpenApi) -> TransformOpenApi {
    api.title("API Gateway")
        .summary("Entry point into A.N.T.T.O microservices")
        .description(include_str!("../README.md"))
}
