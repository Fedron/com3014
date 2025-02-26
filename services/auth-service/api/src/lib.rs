use axum::{
    Router,
    routing::{get, post},
};
use handlers::{login, profile, signup};
use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod handlers;

#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[tokio::main]
pub async fn start() {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let db_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL environment variable to be defined in .env file");
    let conn = Database::connect(db_url)
        .await
        .expect("to connect to database");
    Migrator::up(&conn, None).await.unwrap();

    let app = Router::new()
        .route("/login", post(login))
        .route("/signup", post(signup))
        .route("/profile", get(profile))
        .with_state(AppState { conn });
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .expect("to create TCP listener on localhost:3000");

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
