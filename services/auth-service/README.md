# Authentication Service
A basic authentication service with user signup and login functionality. Uses JWT tokens to handle authentication.

API documentation can be found at `/docs`.

## Configuration
The following environment variable are required:
```bash
DATABASE_URL=postgres_url
JWT_SECRET=some_long_and_secure_secret
```

Optional environment variables:
```bash
HOST=127.0.0.1
PORT=3000
JWT_EXPIRATION=3600 # in seconds
```

## Claims Object
The JWT token can be decoded into the following JSON:
```json
{
    "sub": "user uuid",
    "exp": "token expiry",
    "roles": [
        [
            "community id",
            "role name"
        ],
        // ...
    ]
}
```
