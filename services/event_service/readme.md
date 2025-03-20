## API Endpoints

### 1. List & Create Events

- **Endpoint:** `api/v1/events/`
- **Methods:**
  - **GET:** Retrieves a list of all events. Requires a valid JWT token.
  - **POST:** Creates a new event. Requires a valid JWT token. The `created_by` field is set based on the JWT token's subject.

---

### 2. Retrieve, Update, Delete Event

- **Endpoint:** `api/v1/events/<int:event_id>/`
- **Methods:**
  - **GET:** Retrieves detailed information for the specified event. Requires a valid JWT token.
  - **PUT:** Updates an existing event. Requires a valid JWT token and can only be performed by the event's creator.
  - **DELETE:** Deletes the specified event. Requires a valid JWT token and can only be performed by the event's creator.

# Docker Instructions for Event Service

## Build the Docker Image

Run the following command in your project directory (where your Dockerfile is located):

```bash
docker build -t event-service:1.0.0 .

```

## Run the Docker Image in a container

### With persisten database

```bash
docker run -v eventdb:/app/db -p 8000:8000 event-service:1.0.0

```
