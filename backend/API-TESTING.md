# Quick API testing

Use Postman/Thunder Client after starting the server.

## Login
`POST http://localhost:5000/api/auth/login`

JSON body:
```json
{ "email": "volunteer@demo.com", "password": "password123", "role": "volunteer" }
```

Copy the returned token and use `Authorization: Bearer TOKEN` for protected routes.

## Browse events
`GET http://localhost:5000/api/events`

## Register for an event
`POST http://localhost:5000/api/events/e2/register` with a volunteer token.

## Check service health
`GET http://localhost:5000/api/health`
