const express = require('express');
const { createProfile, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/profile', authMiddleware, createProfile);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;