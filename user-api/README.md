# User API

Basic C# API for user registration, login and user details retrieval.

## Stack

- .NET 10 Web API
- PostgreSQL
- Docker + Docker Compose
- MediatR
- JWT authentication

## Run with Docker

```bash
docker compose up --build
```

API will be available at `http://localhost:8080`.

Swagger UI:

- `http://localhost:8080/swagger`

## Endpoints

- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/user/user/{id}` (requires Bearer token)

## Authentication flow

1. Register a user
2. Log in to receive a JWT token
3. Call `GET /api/user/user/{id}` with header:

```text
Authorization: Bearer <token>
```

## Run tests

```bash
dotnet test user-api.Tests/user-api.Tests.csproj
dotnet test user-api.IntegrationTests/user-api.IntegrationTests.csproj
```

## Build script

PowerShell:

```powershell
./build.ps1
```
