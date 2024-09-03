const User = require('../controllers/models/user');

const checkExistingUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    // Pengecekan nama
    if (name) {
      const existingUserByName = await User.findOne({ name });
      if (existingUserByName && existingUserByName._id.toString() !== req.user?._id.toString()) {
        return res.status(400).json({ error: 'Nama sudah digunakan, harap pilih nama lain.' });
      }
    }

    // Pengecekan email
    if (email) {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail && existingUserByEmail._id.toString() !== req.user?._id.toString()) {
        return res.status(400).json({ error: 'Email sudah digunakan, harap gunakan email lain.' });
      }
    }

    next(); // Jika tidak ada konflik, lanjutkan ke middleware berikutnya
  } catch (err) {
    console.error('Error in checkExistingUser:', err); // Log error jika terjadi
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
};

module.exports = checkExistingUser;
