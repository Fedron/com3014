use axum::{
    Router,
    routing::{get, post},
};

use crate::handlers::{login, profile};

pub fn create_router() -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/profile", get(profile))
}
