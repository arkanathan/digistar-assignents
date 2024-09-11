const User = require('../models/userModel');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../services/authService');
const { body, validationResult } = require('express-validator');  // Tambahkan validator

// Fungsi untuk registrasi pengguna baru dengan error handling dan validasi input
exports.register = [
  body('email').isEmail().withMessage('Masukkan email yang valid'),
  body('password').isLength({ min: 6 }).withMessage('Password harus memiliki minimal 6 karakter'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, username, password } = req.body;
      
      // Cek apakah pengguna dengan email atau username yang sama sudah ada
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        const error = new Error('Email atau Username sudah digunakan');
        error.statusCode = 400; // Bad Request
        return next(error);
      }

      // Jika pengguna belum ada, buat pengguna baru
      const newUser = await User.create({ email, username, password });

      // Buat JWT token
      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      // Kirimkan refresh token melalui cookie dan access token sebagai respons
      res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(201).json({ accessToken });
    } catch (error) {
      next(error); // Operasikan error ke middleware global
    }
  }
];

// Fungsi untuk login pengguna dengan error handling dan validasi input
exports.login = [
  body('email').isEmail().withMessage('Masukkan email yang valid'),
  body('password').isLength({ min: 6 }).withMessage('Password harus memiliki minimal 6 karakter'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Cek apakah pengguna ada
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error('Pengguna tidak ditemukan');
        error.statusCode = 404; // Not Found
        return next(error);
      }

      // Bandingkan password yang diberikan dengan password yang di-hash
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        const error = new Error('Password salah');
        error.statusCode = 401; // Unauthorized
        return next(error);
      }

      // Buat JWT token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Kirimkan refresh token melalui cookie dan access token sebagai respons
      res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error); // Operasikan error ke middleware global
    }
  }
];

// Fungsi untuk memperbarui token akses dengan refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    // Ambil refresh token dari cookie
    const refreshToken = req.cookies.refresh_token;

    // Cek apakah refresh token ada
    if (!refreshToken) {
      const error = new Error('Refresh token tidak ditemukan');
      error.statusCode = 401; // Unauthorized
      return next(error);
    }

    // Verifikasi refresh token
    const decoded = await verifyRefreshToken(refreshToken);
    if (!decoded) {
      const error = new Error('Refresh token tidak valid');
      error.statusCode = 401; // Unauthorized
      return next(error);
    }

    // Cari pengguna berdasarkan id yang ada di refresh token
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error('Pengguna tidak ditemukan');
      error.statusCode = 404; // Not Found
      return next(error);
    }

    // Buat JWT token baru
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Kirimkan refresh token baru melalui cookie dan access token baru sebagai respons
    res.cookie('refresh_token', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error); // Operasikan error ke middleware global
  }
};
