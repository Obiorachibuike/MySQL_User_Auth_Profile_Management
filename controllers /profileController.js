const pool = require('../config/db');

// Create User Profile
exports.createProfile = async (req, res) => {
  const { name, email, company, city } = req.body;
  const { mobile_number } = req.user;

  try {
    await pool.query('UPDATE users SET name = ?, email = ?, company = ?, city = ? WHERE mobile_number = ?', 
      [name, email, company, city, mobile_number]);

    res.status(200).json({ success: true, message: 'Profile created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating profile' });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  const { mobile_number } = req.user;

  try {
    const [rows] = await pool.query('SELECT name, email, company, city FROM users WHERE mobile_number = ?', [mobile_number]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving profile' });
  }
};