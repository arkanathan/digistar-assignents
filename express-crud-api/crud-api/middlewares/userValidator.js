const { check, validationResult } = require('express-validator');

// Aturan validasi
const userValidationRules = () => {
  return [
    check('name')
      .isLength({ min: 3, max: 15 })
      .withMessage('Nama harus antara 3 dan 15 karakter'),
    check('email')
      .isEmail()
      .withMessage('Harap masukkan email yang valid')
      .custom(value => {
        // Contoh validasi custom: hanya menerima email dari domain tertentu
        if (!value.endsWith('@gmail.com')) {
          throw new Error('Email harus berasal dari domain gmail.com');
        }
        return true;
      }),
    check('password')
      .isLength({ min: 7, max: 15 })
      .withMessage('Kata sandi harus antara 7 dan 15 karakter'),
  ];
};

// Middleware untuk memeriksa hasil validasi
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  validate,
};
