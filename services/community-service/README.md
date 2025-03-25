# Community Service
Community microservice for A.N.T.T.O. for high-level management of and tracking user membership of communities. Uses Django and Django Rest Framework.

## Building & Running
`TODO`

# API Endpoints
*All requests should include the final / to ensure Django doesn't raise an error.*
## Retrieving a List of All Communities
### Request
`GET /v1/communities/`
### Response
`HTTP/1.1 200 OK`
```json
[
    {
        "id": "community id",
        "name": "community name",
        "desc": "community description",
        "members": "number of members"
    },

    ...
]
```
## Creating a New Community
### Request
`POST /v1/communities/`
```
name: name of the community (String, 255 limit)
desc: description for the community (String, optional)
```

### Response (Valid)
`HTTP/1.1 201 Created`
```json
{
    "id": "community id",
    "name": "community name",
    "desc": "community description",
    "members": "number of members"
}
```
### Response (Invalid)
`HTTP/1.1 400 Bad Request`
```json
{
    "error": "error raised",
    "invalid_field": "only included if the Invalid input error is raised"
}
```
## Retrieve Details for a Specific Community
### Request
`GET /v1/communities/<int:community_id>/`

### Response (Valid)
`HTTP/1.1 200 OK`
```json
{
    "id": "community id",
    "name": "community name",
    "desc": "community description",
    "members": "number of members"
}
```
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "No community with given id found"
}
```
## Editing a Community
### Request
`PUT /v1/communities/<int:community_id>/`
```
name: new name of the community (String, 255 limit, optional)
desc: new description for the community (String, optional)
```

### Response (Valid)
`HTTP/1.1 200 OK`
```json
{
    "id": "community id",
    "name": "community name",
    "desc": "community description",
    "members": "number of members"
}
```
### Response (Invalid)
`HTTP/1.1 400 Bad Request`
```json
{
    "error": "error raised",
    "invalid_field": "only included if the Invalid input error is raised"
}
```
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "No community with given id found"
}
```
## Delete a Community
### Request
`DELETE /v1/communities/<int:community_id>/`

### Response (Valid)
`HTTP/1.1 204 No Content`
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "No community with given id found"
}
```
## Get all Communities a User is a Member of
### Request
`GET /v1/user/<int:user_id>/`
### Response (Valid)
`HTTP/1.1 200 OK`
```json
{
    "user_id": "user id",
    "communities": ["list of community ids"]
}
```
### Response (Invalid)
`HTTP/1.1 400 Bad Request`
```json
{
    "error": "Invalid user ID"
}
```
## Delete a User
### Request
`DELETE /v1/user/<int:user_id>/`
### Response (Valid)
`HTTP/1.1 204 No Content`
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "Object with given UID not found"
}
```
**NOTE:** *A user object is only created if the user id is looked up or the user has joined/left a community. A 404 response is therefore possible even with a valid user id.*
## Add a User to a Community's Membership
### Request
`POST /v1/user/join/`
```
user_id: the user's id
community_id: the community's id
```
### Response (Valid)
`HTTP/1.1 200 OK`
### Response (Invalid)
`HTTP/1.1 400 Bad Request`
```json
{
    "error": "Invalid user ID"
}
```
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "No community with given id found"
}
```
## Remove a User from a Community's Membership
### Request
`POST /v1/user/leave/`
```
user_id: the user's id
community_id: the community's id
```
### Response (Valid)
`HTTP/1.1 200 OK`
### Response (Invalid)
`HTTP/1.1 400 Bad Request`
```json
{
    "error": "Invalid user ID"
}
```
### Response (Not Found)
`HTTP/1.1 404 Not Found`
```json
{
    "error": "No community with given id found"
}
```