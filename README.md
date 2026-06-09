# E-Commerce Backend

## Overview

This repository contains the backend service for the E-Commerce application.
It is a Node.js + Express API that handles user registration, email verification, MongoDB persistence, Redis-based temporary token storage, and SMTP email delivery.

## Features

- Register user accounts with email verification
- Store pending registrations in Redis for secure short-lived verification
- Create users in MongoDB after email verification
- Protect user registration with rate limiting per IP/email
- Send verification emails via Gmail SMTP
- Validate request payloads using Zod

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Redis
- Nodemailer
- Zod
- Bcrypt
- dotenv

## Requirements

- Node.js 18+ installed
- MongoDB database
- Redis instance
- Gmail SMTP credentials or SMTP provider

## Getting Started

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` with the following variables:

```env
PORT=PORT_NUMBER
MONGO_URI=FROM_MONGODB_ATLAS
REDIS_URL=FROM_UPSTASH
SMTP_USER=EMAIL@SENDER.COM
SMTP_PASSWORD=FROM_GOOGL_SECURITY
APP_NAME=YOUR_APP_NAME
FRONTEND_URL=YOUR_FRONTEND_URL
```

3. Start the server in development mode:

```bash
npm run dev
```

Or start in production mode:

```bash
npm start
```

## API Endpoints

### Register a user

- URL: `POST /api/v1/register`
- Description: Validates registration data, rate-limits repeated requests, stores pending user data in Redis, and sends a verification email.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

- `200 OK` when verification email is sent
- `400 Bad Request` for validation or existing user errors
- `429 Too Many Requests` for rate limit enforcement

### Verify user email

- URL: `POST /api/v1/verify/:token`
- Description: Confirms the verification token, creates a new user, and removes the temporary Redis entry.

Response:

- `201 Created` when the user account is created
- `400 Bad Request` when the token is invalid, expired, or the user already exists

## Environment Variables

- `PORT` — server port (default: `5000`)
- `MONGO_URI` — MongoDB connection string
- `REDIS_URL` — Redis connection URL
- `SMTP_USER` — SMTP sender email for verification messages
- `SMTP_PASSWORD` — SMTP sender email password or app password
- `APP_NAME` — application name used in verification email templates
- `FRONTEND_URL` — frontend base URL used to build verification links

## Project Structure

- `index.js` — application entry point
- `config/db.js` — MongoDB connection
- `config/sendMail.js` — SMTP email sending
- `config/html.js` — email templates
- `config/zod.js` — validation schemas
- `controllers/user.js` — registration and verification logic
- `routes/user.js` — authentication routes
- `models/User.js` — MongoDB user schema
- `middlewares/tryCatch.js` — wrapper for async route handlers

## Notes

- `REDIS_URL` is required; the server exits if it is missing.
- The verification token expires after 5 minutes.
- Registration attempts are rate-limited for each IP/email combination.

## License

This project is released under the ISC License.
