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