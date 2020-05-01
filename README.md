<p align="center">
  Covid-19 API
</p>

# Introduction

This is an API designed for use to help coordinate localised reporting of COVID-symptoms, and allow people to request help if they are self-isolating.

## Getting Started

Run:

```bash
yarn
```

```bash
yarn start
```

In GraphQL Playground settings, change:

```JSON
"request.credentials": "omit",
```

to:

```JSON
"request.credentials": "include",
```

## Sample Mutations

### Registration

```graphql
mutation {
  register(email: "hello@example.com", password: "t3st1ng")
}
```

#### Response

```JSON
{
  "data": {
    "register": {
      "success": true,
      "code": "200",
      "message": "User successfully registered",
      "user": {
        "id": "24435bce-90c5-4f77-9383-f6ac159acd10",
        "email": "hello@example.com"
      }
    }
  }
}
```

### Login

```graphql
mutation {
  login(email: "test@testing.com", password: "testing") {
    success
    code
    message
    user {
      id
      email
    }
  }
}
```

#### Response

```JSON
{
  "data": {
    "login": {
      "success": true,
      "code": "200",
      "message": "User successfully logged in",
      "user": {
        "id": "3301725c-45a9-4d28-84d4-c3b62e618a10",
        "email": "hello@example.com"
      }
    }
  }
}
```

### Create a report

```graphql
mutation {
  newReport(
    location: { lat: "55.86515", lng: "-4.25763" }
    request: {
      message: "I need help getting a prescription from my local pharmacy."
    }
    symptoms: [{ name: "COUGH" }, { name: "FEVER" }]
  ) {
    success
    code
    message
    report {
      id
      location {
        lat
        lng
      }
      request {
        id
        message
      }
      symptoms {
        id
        name
      }
    }
  }
}
```

#### Response

```JSON
{
  "data": {
    "newReport": {
      "success": true,
      "code": "200",
      "message": "Successfully created report",
      "report": {
        "id": "3ea0e8fc-56e5-4527-b980-56e4b772acc0",
        "location": {
          "lat": "55.86515",
          "lng": "-4.25763"
        },
        "request": {
          "id": "37669f41-e67f-4d66-a3d4-0b4d98d80b00",
          "message": "I need help getting a prescription from my local pharmacy."
        },
        "symptoms": [
          {
            "id": "a0dc7bb5-c0b4-4b80-93c5-4024f0d567b1",
            "name": "COUGH"
          },
          {
            "id": "bfe6c371-e653-4799-8bc2-fc3b6824a33f",
            "name": "FEVER"
          }
        ]
      }
    }
  }
}
```

### Add a Reply

```graphql
mutation {
  addReply(
    request: "fa08dab5-f8f6-4172-806b-4a7ae205a604"
    message: "I can help you with this! You can reach me on 0712345678"
  ) {
    code
    success
    message
    reply {
      id
      request {
        id
        message
      }
      message
    }
  }
}
```

#### Response

```JSON
{
  "data": {
    "addReply": {
      "code": "200",
      "success": true,
      "message": "Successfully added reply",
      "reply": {
        "id": "b1510dd8-6c8b-4bc7-8898-920792d46b80",
        "request": {
          "id": "fa08dab5-f8f6-4172-806b-4a7ae205a604",
          "message": "I need help getting a prescription from my local pharmacy."
        },
        "message": "I can help you with this! You can reach me on 0712345678"
      }
    }
  }
}
```

## Sample Queries

### List Locations

```graphql
query {
  listLocations {
    code
    success
    message
    locations {
      id
      lat
      lng
    }
  }
}
```

#### Response

```JSON
{
  "data": {
    "listLocations": {
      "code": "200",
      "success": true,
      "message": "Successfully retrieved locations",
      "locations": [
        {
          "id": "2f1efcb6-77a3-4894-bd42-8f9d25173ebe",
          "lat": "55.86515",
          "lng": "-4.25763"
        }
      ]
    }
  }
}
```

### List Reports

```graphql
query {
  listReports {
    reports {
      id
      symptoms {
        name
      }
      request {
        id
        message
        replies {
          id
          message
        }
      }
      location {
        lat
        lng
      }
    }
  }
}
```

#### Response

```JSON
{
  "data": {
    "listReports": {
      "reports": [
        {
          "id": "1168ccf3-573d-42e6-8df9-7a29a13db1ff",
          "symptoms": [
            {
              "name": "COUGH"
            },
            {
              "name": "FEVER"
            }
          ],
          "request": {
            "id": "fa08dab5-f8f6-4172-806b-4a7ae205a604",
            "message": "I need help getting a prescription from my local pharmacy.",
            "replies": [
              {
                "id": "b8782d39-ee9e-45a6-a209-9b431409551b",
                "message": "I can help you with this! You can reach me on 0712345678"
              },
              {
                "id": "fcf42425-314b-48d4-9d3a-4a6782920a65",
                "message": "I live around the corner so can help! My email is: test@hello.com"
              },
            ]
          },
          "location": {
            "lat": "55.86515",
            "lng": "-4.25763"
          }
        }
      ]
    }
  }
}
```

### Authentication

Auth is handled via JWT. Once a user is logged in, we set two cookies:

`access-token`

`refresh-token`

These are valid for 15 minutes and 7 days respectively.

We have a middleware for all requests which checks for the presence of an access token, and if it is valid we log the user in. If it has expired we then check for a refresh token. If this is valid we then issue a new access token and log the user in. Otherwise we treat the requester as a guest.

#### Token Invalidation

We can invalidate a user's tokens with the mutation `invalidateTokens`. This can be used on resetting a password, or any other prompt which may be useful for us to require new access and refresh tokens to be issued.

#

Conventional commits are enforced: https://www.conventionalcommits.org/en/v1.0.0/#summary

## Authors

- **Ruairidh Wynne Mchardy** - [Twitter](https://twitter.com/ruairidhwm)
