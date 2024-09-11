const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SECRET_KEY = process.env.JWT_SECRET; // Mengambil kunci rahasia JWT dari file .env

// Fungsi untuk membuat access token dengan masa berlaku 15 menit
exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '15m' });
};

// Fungsi untuk membuat refresh token dengan masa berlaku 7 hari
exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    // Verifikasi refresh token menggunakan secret key
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
