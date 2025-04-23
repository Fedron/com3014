use reqwest::Client;

use crate::error::AppError;

#[derive(Clone)]
pub struct AppState {
    pub client: Client,
    auth_service: String,
    events_service: String,
}

impl AppState {
    pub fn from_dotenv() -> Result<Self, AppError> {
        let auth_service = std::env::var("AUTH_SERVICE_HOST")
            .map_err(|_| AppError::EnvironmentVariable("AUTH_SERVICE_HOST"))?;
        let events_service = std::env::var("EVENTS_SERVICE_HOST")
            .map_err(|_| AppError::EnvironmentVariable("EVENTS_SERVICE_HOST"))?;

        let client = Client::builder().build()?;

        Ok(Self {
            client,
            auth_service,
            events_service,
        })
    }

    pub fn auth_service(&self) -> String {
        format!("http://{}/v1", self.auth_service)
    }

    pub fn events_service(&self) -> String {
        format!("http://{}/api/v1", self.events_service)
    }
}
