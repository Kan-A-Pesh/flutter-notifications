# Endpoints

Here is a list of all available endpoints, along with their descriptions and usage.

The API is divided into two main categories: `public` and `admin`.\
The `public` category contains endpoints that are available to the public, and may be accessed without any authentication.\
The `admin` category contains endpoints that are only available with the admin API key.

Data is sent and received in JSON format, and the `Content-Type` header must be set to `application/json` for all requests.\
The `Accept` header must also be set to `application/json` for all requests.

Responses are sent with the appropriate status code, and the response body contains the following format:

```json
{
    "message": "string",
    "data": "object" // optional (may be undefined for error responses)
}
```

The `message` field contains a human-readable message that describes the result of the request.\
The `data` field contains the response data, if any (refer to the _"Success data"_ section for each endpoint).

## Public

The following endpoints are available to the public, and may be accessed without any authentication.

### Session

Endpoints for managing user sessions.

#### POST /session

Create a new session.

Parameters:

```json
{
    "email": "string"
}
```

Response codes:\
`201`, `400`, `401`

Success data:

```json
{
    "sessionId": "UUID",
    "userId": "UUID",
    "expiresAt": "Date"
}
```

#### ~~PUT /session (reserved)~~

> **Note:** This endpoint is reserved for future use.

#### DELETE /session

Destroy the current session.

Parameters:\
**Authorization:** This endpoint requires a USER token.

Response codes:\
`204`, `401`

### Push Channels

Endpoints for managing push channels.\
A channel is a unique identifier for a user's device, which is used to send push notifications to users.

#### POST /channels

Create a new push channel for the current user.

Parameters:\
**Authorization:** This endpoint requires a USER token.

```json
{
    "channel": "string"
}
```

Response codes:\
`201`, `400`, `401`, `409`

Success data:

```json
{
    "channel": {
        "id": "string",
        "key": "string",
        "userId": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### DELETE /channels

Delete all push channels for the current user.

Parameters:\
**Authorization:** This endpoint requires a USER token.

Response codes:\
`204`, `401`

#### DELETE /channels/:channel_id

Delete a specific push channel (using the secure key).\
This endpoint is used to remove a specific push channel even if the user is not authenticated.

Parameters:

```json
{
    "key": "string"
}
```

Response codes:\
`204`, `401`, `404`

## Admin

The following endpoints are only available with the admin API key.\
To be authorized as an admin, the `X-API-KEY` header must be set to the admin API key (set in the environment variable `ADMIN_API_KEY`).\
The admin API key is used to perform administrative tasks, such as creating new users, groups, and notifications.

### Users

#### POST /users

Create a new user.

Parameters:

```json
{
    "email": "string"
}
```

Response codes:\
`201`, `400`, `401`, `409`

Success data:

```json
{
    "user": {
        "id": "UUID",
        "email": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### GET /users

Get a list of all users.

Response codes:\
`200`, `401`

Success data:

```json
{
    "users": [
        {
            "id": "UUID",
            "email": "string",
            "createdAt": "Date",
            "updatedAt": "Date"
        },
        ...
    ]
}
```

#### GET /users/:user_id

Get a specific user.

Response codes:\
`200`, `401`, `404`

Success data:

```json
{
    "user": {
        "id": "UUID",
        "email": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### PUT /users/:user_id

Update a user. Only the `email` field may be updated.

Parameters:

```json
{
    "email": "string"
}
```

Response codes:\
`200`, `400`, `401`, `404`, `409`

Success data:

```json
{
    "user": {
        "id": "UUID",
        "email": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### DELETE /users/:user_id

Delete a user.

Response codes:\
`204`, `401`, `404`

### Groups

#### POST /groups

Create a new group.

Parameters:

```json
{
    "name": "string"
}
```

Response codes:\
`201`, `400`, `401`, `409`

Success data:

```json
{
    "group": {
        "id": "UUID",
        "name": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### GET /groups

Get a list of all groups.

Response codes:\
`200`, `401`

Success data:

```json
{
    "groups": [
        {
            "id": "UUID",
            "name": "string",
            "createdAt": "Date",
            "updatedAt": "Date"
        },
        ...
    ]
}
```

#### GET /groups/:group_id

Get a specific group.

Response codes:\
`200`, `401`, `404`

Success data:

```json
{
    "group": {
        "id": "UUID",
        "name": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### PUT /groups/:group_id

Update a group. Only the `name` field may be updated.

Parameters:

```json
{
    "name": "string"
}
```

Response codes:\
`200`, `400`, `401`, `404`, `409`

Success data:

```json
{
    "group": {
        "id": "UUID",
        "name": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### DELETE /groups/:group_id

Delete a group.

Response codes:\
`204`, `401`, `404`

#### POST /groups/:group_id/users

Add a users to a group.

Parameters:

```json
{
    "users": ["UUID", ...]
}
```

Response codes:\
`201`, `400`, `401`, `404`, `409`

Success data:

```json
{
    "users": [
        {
            "id": "UUID",
            "userId": "UUID",
            "groupId": "UUID",
            "createdAt": "Date",
            "updatedAt": "Date"
        },
        ...
    ],
    "group": {
        "id": "UUID",
        "name": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

#### DELETE /groups/:group_id/users

Remove all users from a group.

Response codes:\
`200`, `401`, `404`

Success data:

```json
{
    "users": [
        {
            "id": "UUID",
            "userId": "UUID",
            "groupId": "UUID",
            "createdAt": "Date",
            "updatedAt": "Date"
        },
        ...
    ],
    "group": {
        "id": "UUID",
        "name": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
    }
}
```

### Notifications

#### POST /notifications

<!-- TODO: Add notification endpoint documentation -->
