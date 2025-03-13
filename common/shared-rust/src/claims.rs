use axum::{RequestPartsExt, extract::FromRequestParts, http::request::Parts};
use axum_extra::{
    TypedHeader,
    headers::{Authorization, authorization::Bearer},
};
use serde::{Deserialize, Serialize, de::DeserializeOwned};
use uuid::Uuid;

use crate::{error::TokenError, jwt::validate_jwt};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims<R> {
    pub sub: Uuid,
    pub exp: usize,
    pub roles: Vec<(Uuid, R)>,
}

impl<S, R> FromRequestParts<S> for Claims<R>
where
    S: Send + Sync,
    R: DeserializeOwned,
{
    type Rejection = TokenError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| TokenError::Validation)?;

        validate_jwt(bearer.token())
    }
}
