[phonebook-readme.md](https://github.com/user-attachments/files/22986827/phonebook-readme.md)

Live API Link: https://phonebook-backend-6s4z.onrender.com/

# Phonebook API

A simple RESTful API for managing a phonebook, built with Express.js and Node.js.

## Features

- View all contacts in the phonebook
- Get information about the phonebook (total contacts and timestamp)
- Retrieve individual contacts by ID
- Add new contacts with validation
- Delete existing contacts

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the source code
2. Install dependencies:

```bash
npm install express
```

## Running the Application

Start the server:

```bash
node index.js
```

The server will start on port 3001. You should see the message:
```
Server running on port 3001
```

## API Endpoints

### Get All Persons

```
GET /api/persons
```

Returns a JSON array of all persons in the phonebook.

**Response Example:**
```json
[
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  }
]
```

### Get Phonebook Info

```
GET /api/persons/info
```

Returns HTML showing the number of contacts and current timestamp.

### Get Single Person

```
GET /api/persons/:id
```

Returns a single person by their ID.

**Response:**
- `200 OK` - Person found
- `404 Not Found` - Person doesn't exist

### Add New Person

```
POST /api/persons
```

Adds a new person to the phonebook.

**Request Body:**
```json
{
  "name": "John Doe",
  "number": "123-456-7890"
}
```

**Validation Rules:**
- Both `name` and `number` are required
- Name must be unique (case-insensitive)

**Response:**
- `200 OK` - Person created successfully
- `400 Bad Request` - Validation failed

**Error Examples:**
```json
{ "error": "name or number missing" }
{ "error": "Name already in phonebook." }
```

### Delete Person

```
DELETE /api/persons/:id
```

Deletes a person from the phonebook.

**Response:**
- `204 No Content` - Person deleted successfully

## Testing with cURL

Get all persons:
```bash
curl http://localhost:3001/api/persons
```

Get phonebook info:
```bash
curl http://localhost:3001/api/persons/info
```

Add a new person:
```bash
curl -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","number":"123-456-7890"}'
```

Delete a person:
```bash
curl -X DELETE http://localhost:3001/api/persons/1
```

## Testing with REST Client Tools

You can also test the API using:
- Postman
- Insomnia
- VS Code REST Client extension

## Notes

- This is an in-memory data store. Data will be lost when the server restarts.
- IDs are generated randomly, which may cause collisions in rare cases.
- The API accepts JSON payloads, so remember to set `Content-Type: application/json` header for POST requests.

## Future Improvements

- Add database persistence (MongoDB, PostgreSQL, etc.)
- Implement proper ID generation (UUID)
- Add input validation and sanitization
- Add update (PUT/PATCH) endpoint
- Add environment variable configuration
- Add logging middleware
- Add error handling middleware
