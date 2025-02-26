use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod handlers;
mod routes;

#[tokio::main]
async fn main() {
    dotenvy::from_path("./.env").expect("to load environment variables from `.env`");

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let app = routes::create_router();
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .expect("to create TCP listener on localhost:3000");

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
