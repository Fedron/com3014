FROM rust

COPY . /app
WORKDIR /app/services/auth-service
RUN cargo build --release

CMD ["./target/release/auth-service"]