use axum::Json;
use serde::{Deserialize, Serialize};

use crate::auth::{AuthError, Claims, create_jwt};

#[derive(Deserialize)]
pub struct AuthRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    token: String,
}

pub async fn login(Json(payload): Json<AuthRequest>) -> Result<Json<AuthResponse>, AuthError> {
    if payload.username == "admin" && payload.password == "password" {
        let token = create_jwt("user-123")?;
        Ok(Json(AuthResponse { token }))
    } else {
        Err(AuthError::IncorrectCredentials)
    }
}

pub async fn profile(claims: Claims) -> Result<String, AuthError> {
    Ok(format!("Your profile information:\n{claims:?}"))
}
