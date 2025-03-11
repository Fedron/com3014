use axum::{
    Router,
    routing::{delete, patch, post},
};
use error::AppError;
use handlers::{add_new_roles, login, remove_roles, signup};
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

    let host = std::env::var("HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or("3000".to_string());
    let addr = format!("{host}:{port}");

    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .map_err(|_| AppError::CantListen(addr))?;

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app(conn))
        .await
        .map_err(AppError::Other)
}

fn app(conn: DatabaseConnection) -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/signup", post(signup))
        .route("/roles", patch(add_new_roles))
        .route("/roles", delete(remove_roles))
        .with_state(AppState { conn })
}

#[cfg(test)]
mod tests {
    use axum::{
        body::Body,
        http::{self, Request, StatusCode},
    };
    use http_body_util::BodyExt;
    use sea_orm::{ConnectionTrait, DbBackend, EntityTrait, Schema, Set};
    use serde_json::json;
    use tower::{Service, util::ServiceExt};
    use uuid::Uuid;

    use crate::handlers::SignupResponse;

    use super::*;
    use ::entity::{user, user::Entity as User};

    #[tokio::test]
    async fn can_create_user() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let app = app(conn.clone());

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/signup")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::from(
                        json!({
                            "username": "myuser",
                            "password": "mypassword"
                        })
                        .to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::OK,
            "Status code should have been OK"
        );

        let body = response.into_body().collect().await.unwrap().to_bytes();
        let body: SignupResponse = serde_json::from_slice(&body).unwrap();

        let db_user = User::find_by_id(body.user_id)
            .one(&conn)
            .await
            .unwrap()
            .unwrap();
        assert_eq!(
            db_user.name, "myuser",
            "Expected for `myuser` to be inserted into the database"
        );
    }

    #[tokio::test]
    async fn username_must_be_unique() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let app = app(conn.clone());

        let existing_user = user::ActiveModel {
            id: Set(Uuid::new_v4()),
            name: Set("existinguser".to_owned()),
            password: Set("mypassword".to_owned()),
        };
        User::insert(existing_user).exec(&conn).await.unwrap();

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/signup")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::from(
                        json!({
                            "username": "existinguser",
                            "password": "strongpassword"
                        })
                        .to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::CONFLICT,
            "Status code should have been CONFLICT"
        );
    }

    #[tokio::test]
    async fn empty_credentials_cannot_create_user() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let app = app(conn.clone());

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/signup")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::BAD_REQUEST,
            "Status code should have been BAD_REQUEST"
        );
    }

    #[tokio::test]
    async fn valid_user_can_login() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let mut app = app(conn.clone());

        app.call(
            Request::builder()
                .uri("/signup")
                .method(http::Method::POST)
                .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                .body(Body::from(
                    json!({
                        "username": "myuser",
                        "password": "mypassword"
                    })
                    .to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/login")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::from(
                        json!({
                            "username": "myuser",
                            "password": "mypassword"
                        })
                        .to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::OK,
            "Status code should have been OK"
        );
    }

    #[tokio::test]
    async fn empty_credentials_cannot_login() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let app = app(conn.clone());

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/login")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::BAD_REQUEST,
            "Status code should have been BAD_REQUEST"
        );
    }

    #[tokio::test]
    async fn invalid_password_cannot_login() {
        // Arrange.
        setup_env_vars();
        let conn = setup_database().await;
        let mut app = app(conn.clone());

        app.call(
            Request::builder()
                .uri("/signup")
                .method(http::Method::POST)
                .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                .body(Body::from(
                    json!({
                        "username": "myuser",
                        "password": "mypassword"
                    })
                    .to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

        // Act.
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/login")
                    .method(http::Method::POST)
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::from(
                        json!({
                            "username": "myuser",
                            "password": "invalidpassword"
                        })
                        .to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();

        // Assert.
        assert_eq!(
            response.status(),
            StatusCode::UNAUTHORIZED,
            "Status code should have been UNAUTHORIZED"
        );
    }

    fn setup_env_vars() {
        unsafe {
            std::env::set_var("JWT_SECRET", "mysecret");
            std::env::set_var("JWT_EXPIRATION", "1")
        }
    }

    async fn setup_database() -> DatabaseConnection {
        let db = Database::connect("sqlite::memory:").await.unwrap();

        let schema = Schema::new(DbBackend::Sqlite);
        let stmt = schema.create_table_from_entity(User);
        db.execute(db.get_database_backend().build(&stmt))
            .await
            .unwrap();

        db
    }
}
