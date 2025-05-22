FROM rust

COPY . /app
WORKDIR /app/api-gateway
RUN cargo build

CMD ["./target/debug/api-gateway"]