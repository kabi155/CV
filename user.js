const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register with Gmail
router.post('/register/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, profilePhoto: picture });
      await user.save();
    }

    res.status(200).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
});

// Register with Phone Number
router.post('/register/phone', async (req, res) => {
  const { phone } = req.body;
  try {
    const user = new User({ phone });
    await user.save();
    res.status(200).json({ message: 'OTP sent to your phone number', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
});

module.exports = router;