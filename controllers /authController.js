const pool = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

// Send OTP (Mock)
exports.sendOtp = async (req, res) => {
  const { country_code, mobile_number } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Mock OTP

  if (!mobile_number) {
    return res.status(400).json({ success: false, message: 'Mobile number is invalid' });
  }

  try {
    await pool.query('INSERT INTO otps (mobile_number, otp) VALUES (?, ?)', [mobile_number, otp]);
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
};

// Verify OTP and Return JWT Tokens
exports.verifyOtp = async (req, res) => {
  const { mobile_number, otp } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM otps WHERE mobile_number = ? AND otp = ?', [mobile_number, otp]);
    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    await pool.query('DELETE FROM otps WHERE mobile_number = ?', [mobile_number]);

    // Generate tokens
    const user = { id: rows[0].id, mobile_number };
    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    // Save tokens to user table
    await pool.query('INSERT INTO users (mobile_number, access_token, refresh_token) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE access_token = ?, refresh_token = ?', 
      [mobile_number, access_token, refresh_token, access_token, refresh_token]);

    res.status(200).json({ success: true, message: 'OTP verified successfully', access_token, refresh_token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ success: false, message: 'Refresh token is required' });
  }

  try {
    const [user] = await pool.query('SELECT * FROM users WHERE refresh_token = ?', [refresh_token]);
    if (user.length === 0) {
      return res.status(403).json({ success: false, message: 'Invalid refresh token' });
    }

    jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid refresh token' });
      }

      const access_token = generateAccessToken(user[0]);
      res.status(200).json({ success: true, message: 'Token refreshed successfully', access_token });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error refreshing token' });
  }
};