use axum::{
    Router,
    routing::{get, post},
};
use error::AppError;
use handlers::{login, profile, signup};
use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod error;
mod handlers;

#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[tokio::main]
pub async fn start() -> Result<(), AppError> {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let db_url =
        std::env::var("DATABASE_URL").map_err(|_| AppError::EnvironmentVariable("DATABASE_URL"))?;
    let conn = Database::connect(db_url).await?;
    Migrator::up(&conn, None).await?;

    let app = Router::new()
        .route("/login", post(login))
        .route("/signup", post(signup))
        .route("/profile", get(profile))
        .with_state(AppState { conn });
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .map_err(|_| AppError::CantListen("127.0.0.1:3000".to_string()))?;

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app)
        .await
        .map_err(|err| AppError::Other(err))
}
