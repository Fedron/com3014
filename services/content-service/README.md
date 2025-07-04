## Docker Instructions

### 1. Run redis-server in standalone terminal

- `redis-server`

### 2. Docker Build

- `docker build -t content-service:latest -f services/content-service/Dockerfile .`

### 3. Docker Run

- `docker run -p "8000:8000" -e "REDIS_SERVER=redis://host.docker.internal:6379/1" content-service`

## Content Service Endpoints

### 1. List & Create Posts

- **Endpoint:** `v1/posts/list/<int:community_id>/`
- **Methods:**
  - **GET:** Retrieves a list of all posts for a community.
  - **POST:** Creates a new post.

---

### 2. List All Posts

- **Endpoint:** `v1/posts/list/<int:community_id>/`
- **Methods:**
  - **GET:** Retrieves a list of all posts for a community.

---

### 3. Retrieve, Update, Delete Posts

- **Endpoint:** `v1/posts/<int:post_id>/`
- **Methods:**
  - **GET:** Retrieves detailed information for the specified post.
  - **PUT:** Updates an existing post.
  - **DELETE:** Deletes the specified post.

---

### 4. List & Create Comments

- **Endpoint:** `v1/comments/list/<int:post_id>/`
- **Methods:**
  - **GET:** Retrieves a list of all comments for a post.
  - **POST:** Creates a new comment.

---

### 5. Retrieve, Update, Delete Comments

- **Endpoint:** `v1/comments/<int:comment_id>/`
- **Methods:**
  - **GET:** Retrieves detailed information for the specified comment.
  - **PUT:** Updates an existing comment.
  - **DELETE:** Deletes the specified comment.
