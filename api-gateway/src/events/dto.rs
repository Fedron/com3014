use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct Event {
    pub id: u32,
    pub name: String,
    pub description: String,
    pub event_datetime: DateTime<Utc>,
    pub location: String,
    pub created_by: Uuid,
    pub deadline: DateTime<Utc>,
    pub max_capacity: u32,
    pub joined_count: u32,
}

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct CreateEvent {
    name: String,
    description: String,
    event_datetime: DateTime<Utc>,
    location: String,
    deadline: String,
    max_capacity: u32,
}

#[derive(Serialize)]
pub struct InternalCreateEvent {
    name: String,
    description: String,
    event_datetime: DateTime<Utc>,
    location: String,
    deadline: String,
    max_capacity: u32,
    pub created_by: Uuid,
}

impl From<CreateEvent> for InternalCreateEvent {
    fn from(value: CreateEvent) -> Self {
        Self {
            name: value.name,
            description: value.description,
            event_datetime: value.event_datetime,
            location: value.location,
            deadline: value.deadline,
            max_capacity: value.max_capacity,
            created_by: Uuid::max(),
        }
    }
}

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct UpdateEvent {
    name: Option<String>,
    description: Option<String>,
    event_datetime: Option<DateTime<Utc>>,
    location: Option<String>,
    deadline: Option<String>,
    max_capacity: Option<u32>,
}
