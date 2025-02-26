use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;
use uuid::Uuid;

#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("missing an expected environment variable '{0}'")]
    EnvironmentVariable(&'static str),
    #[error(transparent)]
    Database(#[from] sea_orm::DbErr),
    #[error("the app is unable to listen on {0}")]
    CantListen(String),
    #[error("other error: {0}")]
    Other(std::io::Error),
}

#[derive(thiserror::Error, Debug)]
pub enum AuthError {
    #[error(transparent)]
    Database(#[from] sea_orm::DbErr),
    #[error("supplied credentials were invalid")]
    InvalidCredentials,
    #[error("the user with name '{0}' already exists")]
    UserExists(String),
    #[error("user id '{0}' is invalid")]
    UserIdInvalid(Uuid),
    #[error(transparent)]
    Token(#[from] TokenError),
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        tracing::error!("authentication error: {}", self);
        let status = match self {
            AuthError::InvalidCredentials => StatusCode::BAD_REQUEST,
            AuthError::UserExists(_) => StatusCode::CONFLICT,
            AuthError::UserIdInvalid(_) => StatusCode::UNAUTHORIZED,
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

#[derive(thiserror::Error, Debug)]
pub enum TokenError {
    #[error("a jwt token could not be created")]
    Creation,
    #[error("validation of the jwt token failed")]
    Validation,
    #[error("creating a jwt token resulted in a date out of range")]
    ExpirationOutOfRange,
}

impl IntoResponse for TokenError {
    fn into_response(self) -> Response {
        tracing::error!("token error: {}", self);
        let status = match self {
            TokenError::Validation => StatusCode::BAD_REQUEST,
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
