# Authentication Service
A basic authentication service with user signup and login functionality. Uses JWT tokens to handle authentication.

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