use reqwest::Client;

use crate::error::AppError;

#[derive(Clone)]
pub struct AppState {
    pub client: Client,
    pub auth_service: String,
}

impl AppState {
    pub fn from_dotenv() -> Result<Self, AppError> {
        let auth_service = std::env::var("AUTH_SERVICE_HOST")
            .map_err(|_| AppError::EnvironmentVariable("AUTH_SERVICE_HOST"))?;

        let client = Client::builder().build()?;

        Ok(Self {
            client,
            auth_service,
        })
    }
}
