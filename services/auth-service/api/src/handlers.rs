use ::entity::{user, user::Entity as User};
use argon2::{
    Argon2, PasswordHash, PasswordHasher, PasswordVerifier,
    password_hash::{SaltString, rand_core::OsRng},
};
use axum::{Json, extract::State};
use migration::Expr;
use sea_orm::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    AppState,
    auth::{Claims, create_jwt},
    error::AuthError,
};

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    token: String,
}

pub async fn login(
    state: State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, AuthError> {
    if let Some(user) = User::find()
        .filter(Expr::col(user::Column::Name).eq(payload.username.clone()))
        .one(&state.conn)
        .await?
    {
        if let Ok(_) = Argon2::default().verify_password(
            payload.password.as_bytes(),
            &PasswordHash::new(&user.password).unwrap(),
        ) {
            let token = create_jwt(user.id)?;
            return Ok(Json(LoginResponse { token }));
        }
    }

    Err(AuthError::InvalidCredentials)
}

#[derive(Deserialize)]
pub struct SignupRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
pub struct SignupResponse {
    user_id: Uuid,
}

pub async fn signup(
    state: State<AppState>,
    Json(payload): Json<SignupRequest>,
) -> Result<Json<SignupResponse>, AuthError> {
    if User::find()
        .filter(Expr::col(user::Column::Name).eq(payload.username.clone()))
        .one(&state.conn)
        .await?
        .is_some()
    {
        return Err(AuthError::UserExists(payload.username));
    }

    let salt = SaltString::generate(&mut OsRng);

    let hash = Argon2::default()
        .hash_password(payload.password.as_bytes(), salt.as_salt())
        .unwrap();

    let created_user = user::ActiveModel {
        id: Set(Uuid::new_v4()),
        name: Set(payload.username),
        password: Set(hash.to_string()),
    }
    .insert(&state.conn)
    .await?;

    Ok(Json(SignupResponse {
        user_id: created_user.id,
    }))
}

pub async fn profile(state: State<AppState>, claims: Claims) -> Result<String, AuthError> {
    if let Some(user) = User::find_by_id(claims.sub).one(&state.conn).await? {
        Ok(format!("Hello, {}!", user.name))
    } else {
        Err(AuthError::UserIdInvalid(claims.sub))
    }
}
