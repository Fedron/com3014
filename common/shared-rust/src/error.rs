use aide::OperationIo;
use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use schemars::JsonSchema;
use serde::Serialize;
use serde_json::json;

#[derive(thiserror::Error, Debug, Serialize, JsonSchema, OperationIo)]
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
            TokenError::Validation => StatusCode::UNAUTHORIZED,
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
