const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, mobile_number: user.mobile_number }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, mobile_number: user.mobile_number }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = { generateAccessToken, generateRefreshToken };