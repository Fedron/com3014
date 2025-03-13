use aide::OperationIo;
use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use schemars::JsonSchema;
use serde::Serialize;

use crate::error::ErrorJson;

#[derive(thiserror::Error, Debug, Serialize, JsonSchema, OperationIo)]
pub enum AuthError {
    #[error("supplied credentials were invalid")]
    InvalidCredentials,
    #[error("reqwest error: {0}")]
    Reqwest(String),
}

impl From<reqwest::Error> for AuthError {
    fn from(value: reqwest::Error) -> Self {
        AuthError::Reqwest(value.to_string())
    }
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        tracing::error!("authentication error: {}", self);
        let status = match self {
            AuthError::InvalidCredentials => StatusCode::BAD_REQUEST,
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        };
        (
            status,
            Json(ErrorJson {
                error: self.to_string(),
            }),
        )
            .into_response()
    }
}
