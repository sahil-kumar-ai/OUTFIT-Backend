# Authentication API

![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)
![Express](https://img.shields.io/badge/express-%3E%3D5-blue)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D6-darkgreen)
![Redis](https://img.shields.io/badge/redis-%3E%3D6-orange)
![JWT](https://img.shields.io/badge/jwt-auth-success)
![License](https://img.shields.io/badge/license-ISC-blue)

## Project Overview

A modern backend authentication API for an application built with Node.js, Express, MongoDB, Redis, JWT, and Nodemailer.

This service supports:
- email verification during registration
- OTP-based login confirmation
- access & refresh token authentication
- secure cookie storage
- user session caching
- rate limiting for critical auth endpoints

## Key Features

- Registration with email verification token
- Secure password hashing via `bcrypt`
- Login with OTP delivered by email
- JWT-based access + refresh token lifecycle
- Redis-backed session caching and rate limiting
- Input validation using `zod`
- MongoDB user persistence via `mongoose`
- Cookie-based authentication for browser-safe sessions
- Production-ready middleware and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis
- JWT
- Nodemailer
- Zod
- bcrypt
- dotenv
- cookie-parser
- mongo-sanitize

## System Architecture

```mermaid
flowchart TB

%% =========================
%% CLIENT LAYER
%% =========================
subgraph CLIENT["Client Layer"]
    A[Frontend Client]
end

%% =========================
%% API LAYER
%% =========================
subgraph API["Express API Layer"]
    B[Express Server]

    R[User Routes]
    M[Auth Middleware]
    C[User Controller]

    B --> R
    R --> M
    M --> C
end

%% =========================
%% VALIDATION & SECURITY
%% =========================
subgraph SECURITY["Security & Validation"]
    Z[Zod Validation]
    J[JWT Token Service]
end

%% =========================
%% DATA LAYER
%% =========================
subgraph DATA["Data Layer"]
    REDIS[(Redis Cache)]
    MONGO[(MongoDB)]
end

%% =========================
%% EXTERNAL SERVICES
%% =========================
subgraph EXTERNAL["External Services"]
    SMTP[SMTP Mail Server]
end

%% =========================
%% FLOW
%% =========================
A -->|Register/Login/Verify| B

C --> Z
C --> J

C --> REDIS
C --> MONGO
C --> SMTP

J --> COOKIES[Access & Refresh Cookies]

%% =========================
%% COLORS
%% =========================

style A fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

style B fill:#000000,stroke:#000000,stroke-width:3px,color:#ffffff
style R fill:#f5f5f5,stroke:#000000,color:#000000
style M fill:#f5f5f5,stroke:#000000,color:#000000
style C fill:#f5f5f5,stroke:#000000,color:#000000

style Z fill:#e5e5e5,stroke:#000000,color:#000000
style J fill:#d4d4d4,stroke:#000000,color:#000000

style REDIS fill:#fafafa,stroke:#000000,color:#000000
style MONGO fill:#fafafa,stroke:#000000,color:#000000

style SMTP fill:#ffffff,stroke:#000000,color:#000000

style COOKIE fill:#262626,stroke:#000000,color:#ffffff
``` 

## Authentication Flow

```mermaid
sequenceDiagram
  participant User
  participant Client
  participant API
  participant Redis
  participant Email
  participant MongoDB

  User->>Client: Submit registration form
  Client->>API: POST /api/v1/register
  API->>Redis: store verify:<token>
  API->>Email: send verification email
  Email-->>User: verification link
  User->>Client: click verification link
  Client->>API: POST /api/v1/verify/:token
  API->>Redis: get verify:<token>
  API->>MongoDB: create user
  API-->>Client: registration success

  User->>Client: Submit login credentials
  Client->>API: POST /api/v1/login
  API->>MongoDB: find user by email
  API->>Email: send OTP
  User->>Client: enter OTP
  Client->>API: POST /api/v1/verify
  API->>Redis: verify stored OTP
  API->>Client: set accessToken + refreshToken cookies
  Client->>API: GET /api/v1/me (authenticated)
``` 

## API Request / Response Flow

```mermaid
flowchart LR
  subgraph Client
    A[Browser / SPA / Mobile App]
  end
  subgraph API
    B[Express Router]
    C[Auth Controllers]
    D[Middleware]
  end
  subgraph Data
    E[Redis Cache]
    F[MongoDB User Store]
  end
  A -->|HTTP Request| B
  B --> C
  C --> D
  C --> E
  C --> F
  D --> F
  F --> C
  E --> C
  C -->|HTTP Response| A
``` 

## Folder Structure

```text
E-Commerce/
├─ backend/
│  ├─ config/
│  │  ├─ db.js
│  │  ├─ generateToken.js
│  │  ├─ html.js
│  │  ├─ sendMail.js
│  │  └─ zod.js
│  ├─ controllers/
│  │  └─ user.js
│  ├─ middlewares/
│  │  ├─ isAuth.js
│  │  └─ tryCatch.js
│  ├─ models/
│  │  └─ User.js
│  ├─ routes/
│  │  └─ user.js
│  ├─ index.js
│  └─ package.json
└─ frontend/
``` 

## Installation & Setup

### Prerequisites

- Node.js 16+
- npm
- MongoDB instance or Atlas cluster
- Redis instance
- SMTP credentials for email delivery

### Setup

```bash
cd d:/E-Commerce/backend
npm install
```

### Environment Configuration

Create a `.env` file in `backend/` with the following values:

```dotenv
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
SMTP_USER=your.email@example.com
SMTP_PASSWORD=your_smtp_password
APP_NAME=YOUR_APP_NAME
FRONTEND_URL=http://localhost:5173
```

### Run Locally

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | HTTP server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `REDIS_URL` | Redis connection URI | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for access JWT signing | `supersecret-access` |
| `REFRESH_SECRET` | Secret for refresh JWT signing | `supersecret-refresh` |
| `SMTP_USER` | SMTP username / sender email | `no-reply@example.com` |
| `SMTP_PASSWORD` | SMTP password | `smtp-password` |
| `APP_NAME` | App name shown in email templates | `OUTFIT` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |

## API Endpoints

### Authentication Endpoints

#### Register User

- Method: `POST`
- URL: `/api/v1/register`
- Body:
  - `name` (string, min 3)
  - `email` (string)
  - `password` (string, min 8)

Example request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123"
}
```

Success response:

```json
{
  "message": "If your email is valid, a veriication link has been send. It will expire in 5min"
}
```

#### Verify Email

- Method: `POST`
- URL: `/api/v1/verify/:token`

Success response:

```json
{
  "message": "Email verified sucessfully! Your Account has been created",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

#### Login User

- Method: `POST`
- URL: `/api/v1/login`
- Body:
  - `email` (string)
  - `password` (string)

Response example:

```json
{
  "message": "If your email is valid, an OTP has been send. It will be valid for 5min"
}
```

#### Verify OTP

- Method: `POST`
- URL: `/api/v1/verify`
- Body:
  - `email` (string)
  - `otp` (string)

Success response:

```json
{
  "message": "Welcome Jane Doe",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

> Cookies: `accessToken` and `refreshToken` are set on successful OTP verification.

#### Refresh Token

- Method: `POST`
- URL: `/api/v1/refresh`

Uses cookie `refreshToken`.

Success response:

```json
{ "message": "token refreshed" }
```

#### Get Current Profile

- Method: `GET`
- URL: `/api/v1/me`
- Auth: Requires `accessToken` cookie

Success response:

```json
{
  "_id": "...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "user",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Logout User

- Method: `POST`
- URL: `/api/v1/logout`
- Auth: Requires `accessToken` cookie

Success response:

```json
{ "message": "Logges-Out Sucessfully" }
```

## Security Features

- Password hashing with `bcrypt`
- Token expiration for access and refresh JWTs
- Refresh token storage in Redis
- Rate limiting patterns for registration and login endpoints
- Input sanitization with `mongo-sanitize`
- Request validation using `zod`
- Secure `httpOnly` cookies
- Redis caching for authenticated user sessions

## Deployment Guide

### Production Checklist

1. Configure environment variables in your production environment.
2. Use a managed MongoDB instance or cluster.
3. Use a managed Redis service.
4. Enable HTTPS and secure cookies in `generateToken.js` by setting `secure: true`.
5. Use strong random secrets for `JWT_SECRET` and `REFRESH_SECRET`.
6. Use a reliable SMTP provider for email delivery.

### Deploy Steps

```bash
cd d:/E-Commerce/backend
npm install
npm run start
```

For containerized deployment, build an image that runs `node index.js` and bind port `5000`.

## Future Improvements

- Add product, cart, order, and payment models
- Implement refresh token rotation
- Add rate limiting middleware for all auth endpoints
- Add tests and CI/CD pipeline
- Add frontend integration and OAuth providers
- Add account recovery and password reset flow
- Harden cookie security and deploy behind HTTPS
- Add request logging and performance monitoring

## Contributing

Contributions are welcome.

- Fork the repository
- Create a feature branch: `git checkout -b feature/your-feature`
- Commit changes: `git commit -m "Add feature description"`
- Push branch: `git push origin feature/your-feature`
- Open a pull request with a clear summary and testing notes

## License

This repository is licensed under the ISC License.

---

If you need help integrating the frontend or extending this auth API for product and order workflows, feel free to open an issue or request enhancements.
