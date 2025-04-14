use axum::{
    Json,
    extract::{Path, State},
};
use shared_rust::claims::Claims;

use crate::{events::dto::InternalCreateEvent, state::AppState};

use super::{
    dto::{CreateEvent, Event, UpdateEvent},
    error::EventError,
};

pub async fn get_all_events(state: State<AppState>) -> Result<Json<Vec<Event>>, EventError> {
    let response = state
        .client
        .get(format!("{}/events/", state.events_service()))
        .send()
        .await?
        .json::<Vec<Event>>()
        .await?;

    Ok(Json(response))
}

pub async fn get_event(
    state: State<AppState>,
    Path(event_id): Path<u32>,
) -> Result<Json<Event>, EventError> {
    let response = state
        .client
        .get(format!("{}/events/{}", state.events_service(), event_id))
        .send()
        .await?
        .json::<Event>()
        .await?;

    Ok(Json(response))
}

pub async fn create_event(
    state: State<AppState>,
    claims: Claims<String>,
    Json(payload): Json<CreateEvent>,
) -> Result<Json<Event>, EventError> {
    let payload: InternalCreateEvent = payload.into();

    let response = state
        .client
        .post(format!(
            "{}/events/?user_id={}",
            state.events_service(),
            claims.sub
        ))
        .json(&payload)
        .send()
        .await?;

    let response = response.json::<Event>().await?;

    Ok(Json(response))
}

pub async fn delete_event(
    state: State<AppState>,
    claims: Claims<String>,
    Path(event_id): Path<u32>,
) -> Result<(), EventError> {
    match state
        .client
        .get(format!(
            "{}/events/{}/?user_id={}",
            state.events_service(),
            event_id,
            claims.sub
        ))
        .send()
        .await?
        .error_for_status()
    {
        Ok(_) => Ok(()),
        Err(_) => Err(EventError::Permissions),
    }
}

pub async fn update_event(
    state: State<AppState>,
    claims: Claims<String>,
    Path(event_id): Path<u32>,
    Json(payload): Json<UpdateEvent>,
) -> Result<(), EventError> {
    match state
        .client
        .put(format!(
            "{}/events/{}/?user_id={}",
            state.events_service(),
            event_id,
            claims.sub
        ))
        .json(&payload)
        .send()
        .await?
        .error_for_status()
    {
        Ok(_) => Ok(()),
        Err(_) => Err(EventError::Permissions),
    }
}
