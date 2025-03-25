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
pub enum EventError {
    #[error("insufficient permissions")]
    Permissions,
    #[error("reqwest error: {0}")]
    Reqwest(String),
}

impl From<reqwest::Error> for EventError {
    fn from(value: reqwest::Error) -> Self {
        EventError::Reqwest(value.to_string())
    }
}

impl IntoResponse for EventError {
    fn into_response(self) -> Response {
        tracing::error!("events error: {}", self);
        let status = match self {
            EventError::Permissions => StatusCode::UNAUTHORIZED,
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
