const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const router = express.Router();

// Rute untuk registrasi pengguna
router.post('/register', async (req, res, next) => {
  try {
    await register(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Rute untuk login pengguna
router.post('/login', async (req, res, next) => {
  try {
    await login(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Rute untuk memperbarui token
router.post('/token', async (req, res, next) => {
  try {
    await refreshToken(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;