const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
  },
  profilePhoto: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);