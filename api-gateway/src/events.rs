use aide::axum::{ApiRouter, routing::get_with};
use axum::Json;
use dto::Event;
use error::EventError;
use handlers::{create_event, delete_event, get_all_events, get_event, update_event};
use uuid::Uuid;

use crate::{error::ErrorJson, state::AppState};

pub mod dto;
pub mod error;
pub mod handlers;

pub fn routes(state: AppState) -> ApiRouter {
    ApiRouter::new()
        .api_route(
            "/events",
            get_with(get_all_events, |op| {
                op.tag("events")
                    .description("Gets a complete list of all events.")
                    .response_with::<200, Json<Vec<Event>>, _>(|res| {
                        res.description("List of events").example([
                            Event {
                                id: 1,
                                name: "Event Name".into(),
                                description: "Some event description".into(),
                                event_datetime: chrono::Utc::now(),
                                location: "Guildford".into(),
                                created_by: Uuid::new_v4(),
                                deadline: chrono::Utc::now(),
                                max_capacity: 150,
                                joined_count: 57,
                            },
                            Event {
                                id: 1,
                                name: "Event Name".into(),
                                description: "Some event description".into(),
                                event_datetime: chrono::Utc::now(),
                                location: "Florida".into(),
                                created_by: Uuid::new_v4(),
                                deadline: chrono::Utc::now(),
                                max_capacity: 150,
                                joined_count: 57,
                            },
                        ])
                    })
                    .response::<500, ()>()
            })
            .post_with(create_event, |op| {
                op.tag("events")
                    .description("Create a new event.")
                    .response_with::<200, Json<Event>, _>(|res| {
                        res.description("Returns the created event.")
                            .example(Event {
                                id: 1,
                                name: "Event Name".into(),
                                description: "Some event description".into(),
                                event_datetime: chrono::Utc::now(),
                                location: "Guildford".into(),
                                created_by: Uuid::new_v4(),
                                deadline: chrono::Utc::now(),
                                max_capacity: 150,
                                joined_count: 57,
                            })
                    })
                    .response::<500, ()>()
            }),
        )
        .api_route(
            "/events/{event_id}",
            get_with(get_event, |op| {
                op.tag("events")
                    .description("Get a detailed description of an event.")
                    .response_with::<200, Json<Event>, _>(|res| {
                        res.description("Returns the created event.")
                            .example(Event {
                                id: 1,
                                name: "Event Name".into(),
                                description: "Some event description".into(),
                                event_datetime: chrono::Utc::now(),
                                location: "Guildford".into(),
                                created_by: Uuid::new_v4(),
                                deadline: chrono::Utc::now(),
                                max_capacity: 150,
                                joined_count: 57,
                            })
                    })
                    .response::<500, ()>()
            })
            .put_with(update_event, |op| {
                op.tag("events")
                    .description("Update an existing event.")
                    .response_with::<200, Json<Event>, _>(|res| {
                        res.description("Returns the updated event.")
                            .example(Event {
                                id: 1,
                                name: "Updated Name".into(),
                                description: "Updated event description".into(),
                                event_datetime: chrono::Utc::now(),
                                location: "Guildford".into(),
                                created_by: Uuid::new_v4(),
                                deadline: chrono::Utc::now(),
                                max_capacity: 150,
                                joined_count: 57,
                            })
                    })
                    .response_with::<401, Json<ErrorJson>, _>(|res| {
                        res.description("User does not have enough permisions to modify the event.")
                            .example(ErrorJson {
                                error: EventError::Permissions.to_string(),
                            })
                    })
                    .response::<500, ()>()
            })
            .delete_with(delete_event, |op| {
                op.tag("events")
                    .description("Delete an event.")
                    .response::<200, ()>()
                    .response_with::<401, Json<ErrorJson>, _>(|res| {
                        res.description(
                            "User does not have enough permissions to delete the event.",
                        )
                        .example(ErrorJson {
                            error: EventError::Permissions.to_string(),
                        })
                    })
                    .response::<500, ()>()
            }),
        )
        .with_state(state)
}
