FROM rust

COPY . /app
WORKDIR /app/services/auth-service
RUN cargo build

CMD ["./target/debug/auth-service"]