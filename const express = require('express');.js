const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

// Register
router.post('/register', async (req, res) => {
  const { firstName, middleName, lastName, gender, dob, address, email, phone, password } = req.body;
  try {
    const user = new User({ firstName, middleName, lastName, gender, dob, address, email, phone, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
});

// Login with Gmail
router.post('/login/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, profilePhoto: picture });
      await user.save();
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error });
  }
});

module.exports = router;