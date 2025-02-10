const express = require('express');
const twilio = require('twilio');
const router = express.Router();
const User = require('../models/User');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send OTP', error });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    // In a real app, you would compare the OTP with the one stored in the database
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'OTP verification failed', error });
  }
});

module.exports = router;