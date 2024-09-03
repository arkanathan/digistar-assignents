const User = require('../controllers/models/user');

const checkOwnership = async (req, res, next) => {
  try {
    // Mencari pengguna berdasarkan ID yang ada di req.userId
    const user = await User.findById(req.userId);

    // Jika pengguna tidak ditemukan, kirim status 404
    if (!user) {
      return res.status(404).send('Pengguna tidak ditemukan');
    }

    // Menyimpan user di request object untuk digunakan di controller
    req.user = user;

    // Lanjutkan ke middleware atau route handler berikutnya
    next();
  } catch (err) {
    console.error('Error in checkOwnership:', err); // Log error jika terjadi
    return res.status(500).send('Kesalahan server');
  }
};

module.exports = checkOwnership;
