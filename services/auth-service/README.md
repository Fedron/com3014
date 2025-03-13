# Authentication Service
A basic authentication service with user signup and login functionality. Uses JWT tokens to handle authentication.

## Building & Running

Using cargo:
```bash
cargo build --release
cargo run
```

Using docker:
```bash
# assuming cwd is at the root of the repository
docker build -t auth-service:latest -f services/auth-service/Dockerfile .
docker run -p "3000:3000" -e "DATABASE_URL=my_postgres_url","JWT_SECRET=secret" auth-service
```

## Configuration
The following environment variable are required:
```bash
DATABASE_URL=postgres_url
JWT_SECRET=some_long_and_secure_secret
```

Optional environment variables, with their default values:
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
