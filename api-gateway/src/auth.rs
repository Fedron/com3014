use aide::axum::{ApiRouter, routing::post_with};
use axum::Json;
use dto::{LoginResponse, SignupResponse};
use error::AuthError;
use handlers::{login, signup};
use uuid::Uuid;

use crate::{error::ErrorJson, state::AppState};

pub mod dto;
pub mod error;
pub mod handlers;

pub fn routes(state: AppState) -> ApiRouter {
    ApiRouter::new()
        .api_route(
            "/signup",
            post_with(signup, |op| {
                op.description("Create a new user, and automatically log them in.")
                    .tag("authentication")
                    .response_with::<200, Json<SignupResponse>, _>(|res| {
                        res.description("User account ID, and a valid JWT").example(
                            SignupResponse {
                                user_id: Uuid::new_v4(),
                                token: "my-jwt".to_string(),
                            },
                        )
                    })
                    .response_with::<400, Json<ErrorJson>, _>(|res| {
                        res.description("Provided credentials are invalid")
                            .example(ErrorJson {
                                error: AuthError::InvalidCredentials.to_string(),
                            })
                    })
                    .response::<500, ()>()
            }),
        )
        .api_route(
            "/login",
            post_with(login, |op| {
                op.description("Login as an existing user.")
                    .tag("authentication")
                    .response_with::<200, Json<LoginResponse>, _>(|res| {
                        res.description("A valid JWT").example(LoginResponse {
                            token: "my-jwt".to_string(),
                        })
                    })
                    .response_with::<400, Json<ErrorJson>, _>(|res| {
                        res.description("Provided credentials are invalid")
                            .example(ErrorJson {
                                error: AuthError::InvalidCredentials.to_string(),
                            })
                    })
                    .response::<500, ()>()
            }),
        )
        .with_state(state)
}
