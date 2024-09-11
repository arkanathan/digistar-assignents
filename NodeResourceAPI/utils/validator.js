const User = require('../models/userModel');

// Middleware untuk memvalidasi input saat registrasi
exports.validateRegister = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Semua kolom wajib diisi" });
  }

  // Cek apakah email atau username sudah digunakan
  const userExists = await User.findOne({ email }) || await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "Email atau Username sudah ada" });
  }

  // Cek apakah password mengandung karakter khusus
  const passwordPattern = /^(?=.*[!@#$%^&*])/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: "Password harus mengandung minimal satu karakter khusus" });
  }

  next(); // Lanjutkan ke langkah berikutnya jika semua validasi lolos
};
