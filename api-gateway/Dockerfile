FROM rust

COPY . /app
WORKDIR /app/api-gateway
RUN cargo build --release

CMD ["./target/release/api-gateway"]