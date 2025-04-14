use std::str::FromStr;

use axum::{Json, extract::State};
use uuid::Uuid;

use crate::state::AppState;

use super::{
    dto::{LoginResponse, SignupResponse, UserCredentials},
    error::AuthError,
};

pub async fn signup(
    state: State<AppState>,
    Json(payload): Json<UserCredentials>,
) -> Result<Json<SignupResponse>, AuthError> {
    let response = state
        .client
        .post(format!("{}/signup", state.auth_service()))
        .json(&payload)
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;

    if let Some(user_id) = response.get("user_id") {
        let response = state
            .client
            .post(format!("{}/login", state.auth_service()))
            .json(&payload)
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;

        if let Some(token) = response.get("token") {
            Ok(Json(SignupResponse {
                user_id: Uuid::from_str(user_id.as_str().unwrap()).unwrap(),
                token: token.as_str().unwrap().to_string(),
            }))
        } else {
            Err(AuthError::InvalidCredentials)
        }
    } else {
        Err(AuthError::InvalidCredentials)
    }
}

pub async fn login(
    state: State<AppState>,
    Json(payload): Json<UserCredentials>,
) -> Result<Json<LoginResponse>, AuthError> {
    let response = state
        .client
        .post(format!("{}/login", state.auth_service()))
        .json(&payload)
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;

    if let Some(token) = response.get("token") {
        Ok(Json(LoginResponse {
            token: token.as_str().unwrap().to_string(),
        }))
    } else {
        Err(AuthError::InvalidCredentials)
    }
}
