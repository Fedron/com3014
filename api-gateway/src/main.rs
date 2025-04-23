use std::sync::Arc;

use aide::{axum::ApiRouter, openapi::OpenApi, transform::TransformOpenApi};
use axum::Extension;
use docs::docs_routes;
use error::AppError;
use state::AppState;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod docs;
mod error;
mod events;
mod state;

#[tokio::main]
async fn main() -> Result<(), AppError> {
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

    let state = AppState::from_dotenv()?;
    let mut api = OpenApi::default();

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
        .with_state(state);

    let host = std::env::var("HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or("3000".to_string());
    let addr = format!("{host}:{port}");

    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .map_err(|_| AppError::CantListen(addr))?;

    tracing::debug!("listening on http://{}", listener.local_addr().unwrap());
    tracing::debug!(
        "documentation available at http://{}/docs",
        listener.local_addr().unwrap()
    );
    axum::serve(listener, app)
        .await
        .map_err(|e| AppError::Io(e.to_string()))
}

fn api_docs(api: TransformOpenApi) -> TransformOpenApi {
    api.title("API Gateway")
        .summary("Entry point into A.N.T.T.O microservices")
        .description(include_str!("../README.md"))
}
