use aide::OperationIo;
use schemars::JsonSchema;

#[derive(thiserror::Error, Debug, JsonSchema, OperationIo)]
pub enum AppError {
    #[error("missing an expected environment variable '{0}'")]
    EnvironmentVariable(&'static str),
    #[error("the app is unable to listen on {0}")]
    CantListen(String),
    #[error("IO error: {0}")]
    Io(String),
}
