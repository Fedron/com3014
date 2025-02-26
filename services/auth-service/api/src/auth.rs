use std::sync::LazyLock;

use axum::{RequestPartsExt, extract::FromRequestParts, http::request::Parts};
use axum_extra::{
    TypedHeader,
    headers::{Authorization, authorization::Bearer},
};
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::error::TokenError;

struct Keys {
    encoding: EncodingKey,
    decoding: DecodingKey,
}

impl Keys {
    fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }
}

static KEYS: LazyLock<Keys> = LazyLock::new(|| {
    let secret =
        std::env::var("JWT_SECRET").expect("JWT_SECRET environment variable to be defined");
    Keys::new(secret.as_bytes())
});

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: Uuid,
    pub exp: usize,
}

impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
{
    type Rejection = TokenError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| TokenError::Validation)?;
        let token_data = decode::<Claims>(bearer.token(), &KEYS.decoding, &Validation::default())
            .map_err(|_| TokenError::Validation)?;

        Ok(token_data.claims)
    }
}

pub fn create_jwt(user_id: Uuid) -> Result<String, TokenError> {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::seconds(
            std::env::var("JWT_EXPIRATION")
                .unwrap_or(chrono::Duration::days(1).num_seconds().to_string())
                .parse()
                .unwrap_or(chrono::Duration::days(1).num_seconds()),
        ))
        .ok_or(TokenError::ExpirationOutOfRange)?
        .timestamp() as usize;

    let claims = Claims {
        sub: user_id,
        exp: expiration,
    };
    encode(&Header::default(), &claims, &KEYS.encoding).map_err(|_| TokenError::Creation)
}
