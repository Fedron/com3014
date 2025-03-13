use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct UserCredentials {
    username: String,
    password: String,
}

#[derive(Serialize, JsonSchema)]
pub struct SignupResponse {
    pub user_id: Uuid,
    pub token: String,
}

#[derive(Serialize, JsonSchema)]
pub struct LoginResponse {
    pub token: String,
}
