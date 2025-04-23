use aide::OperationIo;
use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use schemars::JsonSchema;
use serde::Serialize;
use serde_json::json;
use shared_rust::error::TokenError;
use uuid::Uuid;

#[derive(thiserror::Error, Debug, JsonSchema, OperationIo)]
pub enum AppError {
    #[error("missing an expected environment variable '{0}'")]
    EnvironmentVariable(&'static str),
    #[error("database error: {0}")]
    Database(String),
    #[error("the app is unable to listen on {0}")]
    CantListen(String),
    #[error("IO error: {0}")]
    Io(String),
}

impl From<sea_orm::DbErr> for AppError {
    fn from(value: sea_orm::DbErr) -> Self {
        Self::Database(value.to_string())
    }
}

#[derive(thiserror::Error, Debug, Serialize, JsonSchema, OperationIo)]
pub enum AuthError {
    #[error("database error: {0}")]
    Database(String),
    #[error("supplied credentials were invalid")]
    InvalidCredentials,
    #[error("supplied password failed authentication")]
    InvalidPassword,
    #[error("the user with name '{0}' already exists")]
    UserExists(String),
    #[error("user id '{0}' is invalid")]
    UserIdInvalid(Uuid),
    #[error(transparent)]
    Token(#[from] TokenError),
}

impl From<sea_orm::DbErr> for AuthError {
    fn from(value: sea_orm::DbErr) -> Self {
        Self::Database(value.to_string())
    }
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        tracing::error!("authentication error: {}", self);
        let status = match self {
            AuthError::InvalidCredentials => StatusCode::BAD_REQUEST,
            AuthError::UserExists(_) => StatusCode::CONFLICT,
            AuthError::InvalidPassword | AuthError::UserIdInvalid(_) => StatusCode::UNAUTHORIZED,
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        };
        (
            status,
            Json(json!({
                "error": self.to_string(),
            })),
        )
            .into_response()
    }
}
