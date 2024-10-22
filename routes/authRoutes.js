const express = require('express');
const { sendOtp, verifyOtp, refreshToken } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/refresh-token', refreshToken);

module.exports = router;