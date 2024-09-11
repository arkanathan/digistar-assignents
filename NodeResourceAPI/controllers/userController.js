const User = require('../models/userModel');

// Fungsi untuk mengambil semua pengguna dengan error handling
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      const error = new Error('Tidak ada pengguna yang ditemukan');
      error.statusCode = 404; // Not Found
      return next(error);
    }
    res.status(200).json(users);
  } catch (error) {
    next(error); // Operasikan error ke middleware global
  }
};

// Fungsi untuk mengambil pengguna berdasarkan ID dengan error handling
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error('Pengguna tidak ditemukan');
      error.statusCode = 404; // Not Found
      return next(error);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error); // Operasikan error ke middleware global
  }
};

// Fungsi untuk mengupdate pengguna dengan error handling
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      const error = new Error('Pengguna tidak ditemukan');
      error.statusCode = 404; // Not Found
      return next(error);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error); // Operasikan error ke middleware global
  }
};

// Fungsi untuk menghapus pengguna dengan error handling
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const error = new Error('Pengguna tidak ditemukan');
      error.statusCode = 404; // Not Found
      return next(error);
    }
    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    next(error); // Operasikan error ke middleware global
  }
};
