// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Tolong masukkan email yang valid'],
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 15,
  },
  linkImgProfile: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
