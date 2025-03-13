use std::sync::LazyLock;

use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Serialize, de::DeserializeOwned};
use uuid::Uuid;

use crate::{claims::Claims, error::TokenError};

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

pub fn create_jwt<R>(user_id: Uuid, roles: Vec<(Uuid, R)>) -> Result<String, TokenError>
where
    R: Serialize,
{
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
        roles,
    };
    encode(&Header::default(), &claims, &KEYS.encoding).map_err(|_| TokenError::Creation)
}

pub fn validate_jwt<R>(token: &str) -> Result<Claims<R>, TokenError>
where
    R: DeserializeOwned,
{
    let token_data = decode::<Claims<R>>(token, &KEYS.decoding, &Validation::default())
        .map_err(|_| TokenError::Validation)?;

    Ok(token_data.claims)
}

#[cfg(test)]
mod tests {
    use uuid::Uuid;

    use super::*;

    #[test]
    fn token_is_created() {
        setup_env_vars();
        let token = create_jwt::<i32>(Uuid::max(), vec![]);
        assert!(
            matches!(token, Ok(_)),
            "a jwt token should have been created"
        );
    }

    #[test]
    fn token_is_valid() {
        setup_env_vars();
        let token = create_jwt::<i32>(Uuid::max(), vec![]).unwrap();
        let claims = validate_jwt::<i32>(&token);

        assert!(
            matches!(claims, Ok(_)),
            "a jwt token should have been created"
        );
        assert_eq!(
            claims.unwrap().sub,
            Uuid::max(),
            "the jwt token claims uuid should match Uuid::MAX"
        );
    }

    fn setup_env_vars() {
        unsafe {
            std::env::set_var("JWT_SECRET", "mysecret");
            std::env::set_var("JWT_EXPIRATION", "1")
        }
    }
}
