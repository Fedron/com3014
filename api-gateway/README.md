# API Gateway
Provides a convenient entry point into the A.N.T.T.O microservices.

## Building & Running

Using cargo:
```bash
cargo build --release
cargo run
```

Using docker:
```bash
# assuming cwd is at the root of the repository
docker build -t api-gateway:latest -f api-gateway/Dockerfile .
docker run -p "3000:3000" -e "AUTH_SERVICE_HOST=auth-service" api-gateway
```

## Configuration
The following environment variable are required:
```bash
AUTH_SERVICE_HOST=auth-service
```

Optional environment variables, with their default values:
```bash
HOST=127.0.0.1
PORT=3000
```
