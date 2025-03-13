use aide::OperationIo;
use schemars::JsonSchema;
use serde::Serialize;

#[derive(thiserror::Error, Debug, JsonSchema, OperationIo)]
pub enum AppError {
    #[error("missing an expected environment variable '{0}'")]
    EnvironmentVariable(&'static str),
    #[error("the app is unable to listen on {0}")]
    CantListen(String),
    #[error("IO error: {0}")]
    Io(String),
    #[error("reqwest error: {0}")]
    Reqwest(String),
}

impl From<reqwest::Error> for AppError {
    fn from(value: reqwest::Error) -> Self {
        AppError::Reqwest(value.to_string())
    }
}

#[derive(Serialize, JsonSchema, OperationIo)]
pub struct ErrorJson {
    pub error: String,
}
