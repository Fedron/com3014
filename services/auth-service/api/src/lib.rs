use std::sync::Arc;

use aide::{
    axum::{
        ApiRouter,
        routing::{patch_with, post_with},
    },
    openapi::OpenApi,
    transform::TransformOpenApi,
};
use axum::{Extension, Json};
use docs::docs_routes;
use error::{AppError, AuthError};
use handlers::{LoginResponse, SignupResponse, add_new_roles, login, remove_roles, signup};
use migration::{Migrator, MigratorTrait};
use sea_orm::Database;
use state::AppState;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use uuid::Uuid;

mod auth;
mod docs;
mod error;
mod handlers;
mod state;

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

    aide::generate::on_error(|error| tracing::error!("{error}"));
    aide::generate::extract_schemas(true);

    let state = AppState { conn };
    let mut api = OpenApi::default();

    let app = ApiRouter::new()
        .nest_api_service("/docs", docs_routes(state.clone()))
        .nest_api_service("/v1", routes(state.clone()))
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

fn routes(state: AppState) -> ApiRouter {
    ApiRouter::new()
        .api_route(
            "/login",
            post_with(login, |op| {
                op.description("Login using user credentials to receive a new JWT token.")
                    .response_with::<200, Json<LoginResponse>, _>(|res| {
                        res.example(LoginResponse {
                            token: "my_jwt_token".to_string(),
                        })
                    })
                    .response_range_with::<4, AuthError, _>(|res| {
                        res.example(AuthError::InvalidCredentials)
                    })
            }),
        )
        .api_route(
            "/signup",
            post_with(signup, |op| {
                op.description("Create a new user.")
                    .response_with::<200, Json<SignupResponse>, _>(|res| {
                        res.example(SignupResponse {
                            user_id: Uuid::new_v4(),
                        })
                    })
                    .response_range_with::<4, AuthError, _>(|res| {
                        res.example(AuthError::InvalidCredentials)
                    })
            }),
        )
        .api_route(
            "/roles",
            patch_with(add_new_roles, |op| {
                op.description("Manage per-community user roles.")
                    .response_with::<204, (), _>(|res| {
                        res.description("User roles have been updated.")
                    })
            })
            .delete_with(remove_roles, |op| {
                op.description("Manage per-community user roles.")
                    .response_with::<204, (), _>(|res| {
                        res.description("User roles have been updated.")
                    })
            }),
        )
        .with_state(state)
}

fn api_docs(api: TransformOpenApi) -> TransformOpenApi {
    api.title("Authorization Service")
        .summary("Handles user authorization")
        .description(include_str!("../../README.md"))
        .default_response_with::<AuthError, _>(|res| res.example(AuthError::InvalidCredentials))
}

#[cfg(test)]
mod tests {
    use axum::{
        body::Body,
        http::{self, Request, StatusCode},
    };
    use http_body_util::BodyExt;
    use sea_orm::{ConnectionTrait, DatabaseConnection, DbBackend, EntityTrait, Schema, Set};
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
        let app = routes(AppState { conn: conn.clone() });

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
        let app = routes(AppState { conn: conn.clone() });

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
        let app = routes(AppState { conn: conn.clone() });

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
        let mut app = routes(AppState { conn: conn.clone() });

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
        let app = routes(AppState { conn: conn.clone() });

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
        let mut app = routes(AppState { conn: conn.clone() });

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
