# SecuriTree API

## Hierarachy
This route makes use of authentication by way of a bearer token. 

The hierarchy route retrieves areas, doors and access_rules from the database and constructs the hierarchy. It then sends this hierarchy in JSON format.

```
Method: GET,
endpoint: /hierarchy,
Authorization: Bearer <token>


response.status: 200, 
response.body: {
    root: {
        name: area_name,
        parent_area: null,
        child_area_ids: [ child_Area_id ],
        doors: [ door_id ],
        access_rules: { accesss_rule_id: true }
    },
    areas: {
        area_id: {
            name: area_name,
            parent_area: parent_area_id,
            child_area_ids: [ child_Area_id ],
            doors: [ door_id ],
            access_rules: { accesss_rule_id: true }
        }
    }, 
    doors: {
        door_id: {
            name: door_name,
            parent_area: parent_area_id,
            status: "open"
        }
    }
}
```

## Login
The login route validates login details and sends an appropriate response.

```
Method: POST,
endpoint: /login,
request.body: {
    username: username,
    password: user_password
}
```
If any fields in the request body are missing, the response will be:
```
response.status: 400,
response.body: {
    message: "One or more fields are missing"
}
```

If the username or password is incorrect, the response will be:
```
response.status: 401,
response.body: {
    message: "Username or password is incorrect"
}
```

If the login was successful:
```
response.status: 200,
response.body: {
    token: jwt_token
}
```

## ManageDoor
This route makes use of authentication by way of a bearer token. 

To unlock door:
```
Method: POST,
endpoint: /door/unlock,
request.body: {
    door: door_id
}
```

If the door was successfully unlocked:
```
response.status: 200,
response.body: {
    message: "Success"
}
```

If the door was already unlocked:
```
response.status: 409,
response.body: {
    message: "Door is already open"
}
```

If the door_id is incorrect:
```
response.status: 400,
response.body: {
    message: "Door ID is invalid"
}
```

To lock door:
```
Method: POST,
endpoint: /door/lock,
request.body: {
    door: door_id
}
```

If the door was successfully locked:
```
response.status: 200,
response.body: {
    message: "Success"
}
```

If the door was already locked:
```
response.status: 409,
response.body: {
    message: "Door is already open"
}
```

If the door_id is incorrect:
```
response.status: 400,
response.body: {
    message: "Door ID is invalid"
}
```

## System
This route makes use of authentication by way of a bearer token.

```
Method: POST,
endpoint: /system,
request.body: {
    system_data: {
        areas: [
            {
                id: "area_id",
                name: "area_name",
                parent_area_id: "parent_area_id",
                child_area_ids: [
                    "child_area_id"
                ]
            }
        ],
        doors: [
            {
                id: "door_id",
                name: "door_name",
                parent_area: "parent_area_id",
                status: "open"
            }
        ],
        access_rules: [
            {
                id: "access_rule_id",
                name: "access_rule_name",
                doors: [
                    "door_id"
                ]
            }
        ]
    },
    registered_users: [
        {
            username: "username",
            first_name: "first_name",
            surname: "surname",
            password: "password"
        }
    ]
}
```

You can supply either system_data or registered users or both. For system data, areas, doors and access_rules are optional, however no documents will be created if they are not supplied. 

```
response.status: 201
```

## Invalid token
If an invalid authorization header is encountered:
```
response.status: 403
```

## Invalid route
For any invalid routed entered by the user:
```
response.status: 404,
response.body: {
    message: "Not found"
}
```

## Server Error
For any server errors:
```
response.status: 500,
response.body: {
    message: "Something went wrong"
}
```