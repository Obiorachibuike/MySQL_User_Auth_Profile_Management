
This file will contain instructions on how to set up the project and run the database, server, and other components.

# User Authentication & Profile Management System

This project is a User Authentication & Profile Management System using Node.js, Express, JWT, and MySQL. It allows users to log in with an OTP, manage their profile, and refresh tokens for session management.

## Features
- OTP-based authentication
- JWT-based session management (access and refresh tokens)
- Profile management (create, update, retrieve)
- Token refreshing with long-lived refresh tokens

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Project Structure

/config db.js                   # Database connection /controllers authController.js        # Authentication logic (OTP, tokens) profileController.js     # Profile management (CRUD) /middlewares authMiddleware.js        # JWT authentication middleware /routes authRoutes.js            # Auth routes profileRoutes.js         # Profile routes /db schema.sql               # SQL file for setting up the database /utils generateToken.js         # JWT generation utility .env                       # Environment variables (DB credentials, JWT secrets) server.js                  # Main server entry point

## Getting Started

### Step 1: Clone the repository
```bash
git clone https://github.com/your-repo/user-auth-system.git
cd user-auth-system

Step 2: Install dependencies

npm install

Step 3: Set up MySQL Database

1. Open your MySQL server and create the database by running the SQL commands in /db/schema.sql:

CREATE DATABASE user_auth_db;
USE user_auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  company VARCHAR(100),
  city VARCHAR(50),
  access_token TEXT,
  refresh_token TEXT
);

CREATE TABLE otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile_number VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



Step 4: Set up environment variables

Create a .env file in the root directory and add your database connection details and JWT secrets:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=user_auth_db
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

Step 5: Run the server

Start the server by running the following command:

npm start

The server will run on http://localhost:5000.

API Endpoints

Auth Endpoints

POST /api/send-otp - Send OTP to the provided mobile number.

Body: { "mobile_number": "1234567890" }


POST /api/verify-otp - Verify OTP and get access/refresh tokens.

Body: { "mobile_number": "1234567890", "otp": "1234" }


POST /api/refresh-token - Refresh access token using refresh token.

Body: { "refresh_token": "your-refresh-token" }



Profile Endpoints

POST /api/profile - Create or update user profile.

Body: { "name": "John Doe", "email": "john@example.com", "company": "My Company", "city": "New York" }


GET /api/profile - Get the logged-in user's profile (requires access token).


JWT Authentication

All profile routes are protected with JWT authentication. You need to include the Authorization header with the token:

Authorization: Bearer your-access-token

Error Handling

The system uses appropriate HTTP status codes and JSON responses for error handling.

401 Unauthorized: Token missing or invalid

400 Bad Request: Invalid inputs

500 Internal Server Error: Server-side errors


Running in Development Mode

To run the server in development mode with live reloading, you can use nodemon:

npm install -g nodemon
nodemon server.js

License

This project is licensed under the MIT License.

### Final Notes
- Be sure to replace placeholders (such as `your-repo`, `yourpassword`, and JWT secrets) with actual values.
- This structure provides flexibility to scale, adding more features like logging out users, handling invalid tokens, or extending the profile management functionality.

