use std::sync::Arc;

use crate::state::AppState;
use aide::{
    axum::{
        ApiRouter, IntoApiResponse,
        routing::{get, get_with},
    },
    openapi::OpenApi,
    scalar::Scalar,
};
use axum::{Extension, Json, response::IntoResponse};

pub fn docs_routes(state: AppState) -> ApiRouter {
    aide::generate::infer_responses(true);

    let router: ApiRouter = ApiRouter::new()
        .api_route_with(
            "/",
            get_with(
                Scalar::new("/docs/private/api.json")
                    .with_title("Auth Service")
                    .axum_handler(),
                |op| op.description("This documentation page."),
            ),
            |p| p,
        )
        .route("/private/api.json", get(serve_docs))
        .with_state(state);

    aide::generate::infer_responses(false);

    router
}

async fn serve_docs(Extension(api): Extension<Arc<OpenApi>>) -> impl IntoApiResponse {
    Json(api).into_response()
}
