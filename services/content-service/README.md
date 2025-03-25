## Content Service Endpoints

### 1. List & Create Posts

- **Endpoint:** `api/v1/posts/<int:community_id>/`
- **Methods:**
  - **GET:** Retrieves a list of all posts for a community. Does not require a user_id.
  - **POST:** Creates a new post. Requires a `user_id` query parameter; the `created_by` field is set based on the provided `user_id`.

---

### 2. Retrieve, Update, Delete Posts

- **Endpoint:** `api/v1/posts/<int:post_id>/`
- **Methods:**
  - **GET:** Retrieves detailed information for the specified post.
  - **PUT:** Updates an existing post. Requires a `user_id` query parameter and can only be performed by the post's creator.
  - **DELETE:** Deletes the specified post. Requires a `user_id` query parameter and can only be performed by the post's creator.

---

### 3. List & Create Comments

- **Endpoint:** `api/v1/posts/<int:post_id>/comment/`
- **Methods:**
  - **GET:** Retrieves a list of all comments for a post. Does not require a user_id.
  - **POST:** Creates a new comment. Requires a `user_id` query parameter; the `created_by` field is set based on the provided `user_id`.

---

### 4. Retrieve, Update, Delete Posts

- **Endpoint:** `api/v1/posts/<int:comment_id>/`
- **Methods:**
  - **GET:** Retrieves detailed information for the specified comment.
  - **PUT:** Updates an existing comment. Requires a `user_id` query parameter and can only be performed by the comment's creator.
  - **DELETE:** Deletes the specified comment. Requires a `user_id` query parameter and can only be performed by the comment's creator.
