use ::entity::{
    sea_orm_active_enums::UserRole,
    user::{self, Entity as User},
    user_community_role_mapping::{self, Entity as UserCommunityRole},
};
use argon2::{
    Argon2, PasswordHash, PasswordHasher, PasswordVerifier,
    password_hash::{SaltString, rand_core::OsRng},
};
use axum::{Json, extract::State};
use migration::Expr;
use sea_orm::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{AppState, auth::create_jwt, error::AuthError};

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
    if payload.username.is_empty() || payload.password.is_empty() {
        return Err(AuthError::InvalidCredentials);
    }

    if let Some(user) = User::find()
        .filter(Expr::col(user::Column::Name).eq(payload.username.clone()))
        .one(&state.conn)
        .await?
    {
        if Argon2::default()
            .verify_password(
                payload.password.as_bytes(),
                &PasswordHash::new(&user.password).unwrap(),
            )
            .is_ok()
        {
            let user_roles = user
                .find_related(UserCommunityRole)
                .all(&state.conn)
                .await?
                .iter()
                .map(|r| (r.community_id, r.role.clone()))
                .collect();

            let token = create_jwt(user.id, user_roles)?;
            return Ok(Json(LoginResponse { token }));
        } else {
            return Err(AuthError::InvalidPassword);
        }
    }

    Err(AuthError::InvalidCredentials)
}

#[derive(Deserialize)]
pub struct SignupRequest {
    username: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
pub struct SignupResponse {
    pub user_id: Uuid,
}

pub async fn signup(
    state: State<AppState>,
    Json(payload): Json<SignupRequest>,
) -> Result<Json<SignupResponse>, AuthError> {
    if payload.username.is_empty() || payload.password.is_empty() {
        return Err(AuthError::InvalidCredentials);
    }

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

#[derive(Deserialize)]
pub struct UpdateRolesRequest {
    user_id: Uuid,
    community_id: Uuid,
    roles: Vec<UserRole>,
}

pub async fn add_new_roles(
    state: State<AppState>,
    Json(payload): Json<UpdateRolesRequest>,
) -> Result<(), AuthError> {
    let user = User::find_by_id(payload.user_id).one(&state.conn).await?;
    if let Some(user) = user {
        let existing_roles: Vec<UserRole> = user
            .find_related(UserCommunityRole)
            .all(&state.conn)
            .await?
            .iter()
            .filter_map(|r| {
                if r.community_id == payload.community_id {
                    Some(r.role.clone())
                } else {
                    None
                }
            })
            .collect();

        for new_role in payload.roles.iter() {
            if !existing_roles.contains(new_role) {
                user_community_role_mapping::ActiveModel {
                    user_id: Set(payload.user_id),
                    community_id: Set(payload.community_id),
                    role: Set(new_role.clone()),
                    ..Default::default()
                }
                .insert(&state.conn)
                .await?;
            }
        }

        Ok(())
    } else {
        Err(AuthError::UserIdInvalid(payload.user_id))
    }
}

pub async fn remove_roles(
    state: State<AppState>,
    Json(payload): Json<UpdateRolesRequest>,
) -> Result<(), AuthError> {
    let user = User::find_by_id(payload.user_id).one(&state.conn).await?;
    if let Some(user) = user {
        let existing_roles: Vec<(i32, UserRole)> = user
            .find_related(UserCommunityRole)
            .all(&state.conn)
            .await?
            .iter()
            .filter_map(|r| {
                if r.community_id == payload.community_id {
                    Some((r.id, r.role.clone()))
                } else {
                    None
                }
            })
            .collect();

        for (id, existing_role) in existing_roles.iter() {
            if payload.roles.contains(existing_role) {
                user_community_role_mapping::ActiveModel {
                    id: Set(*id),
                    ..Default::default()
                }
                .delete(&state.conn)
                .await?;
            }
        }

        Ok(())
    } else {
        Err(AuthError::UserIdInvalid(payload.user_id))
    }
}
