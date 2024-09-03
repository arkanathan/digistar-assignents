const User = require('../controllers/models/user');
const { userValidationRules, validate } = require('../middlewares/userValidator');
const authMiddleware = require('../middlewares/auth');
const checkOwnership = require('../middlewares/checkOwnership');
const checkExistingUser = require('../middlewares/checkExistingUser');

exports.createUser = [
  userValidationRules(),
  validate,
  checkExistingUser, // Tambahkan middleware untuk cek nama dan email
  async (req, res) => {
    try {
      const { name, email, password, linkImgProfile } = req.body;

      const newUser = new User({
        name,
        email,
        password,
        linkImgProfile: linkImgProfile || null, // Jika tidak ada, nilainya null
      });
      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];

exports.getAllUsers = [
  authMiddleware,  // Pastikan pengguna sudah login
  async (req, res) => {
    try {
      // Mengambil semua pengguna dari database, mengecualikan field 'password'
      const users = await User.find().select('-password');
      
      res.status(200).json(users);  // Mengembalikan semua pengguna dalam response tanpa field password
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];


exports.getUserData = [
  authMiddleware,        // Pastikan pengguna sudah login
  async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.userId);
      res.status(200).json(loggedInUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.updateUser = [
  authMiddleware,        // Pastikan pengguna sudah login
  checkOwnership,        // Pastikan pengguna hanya memperbarui datanya sendiri
  userValidationRules(), // Validasi data yang masuk
  validate,
  checkExistingUser,     // Periksa apakah nama atau email sudah digunakan
  async (req, res) => {
    try {
      const { name, email, password, linkImgProfile } = req.body;

      const user = await User.findById(req.userId);  // Pastikan req.userId di-set oleh authMiddleware
      if (!user) return res.status(404).send('User not found');

      // Cek dan perbarui data hanya jika ada data baru yang valid
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (linkImgProfile) user.linkImgProfile = linkImgProfile;

      await user.save();

      res.status(200).json(user);
    } catch (err) {
      console.error(err);  // Tambahkan log untuk melihat kesalahan
      res.status(400).json({ error: err.message });
    }
  }
];


exports.deleteUser = [
  authMiddleware,        // Pastikan pengguna sudah login
  checkOwnership,        // Pastikan pengguna hanya menghapus datanya sendiri
  async (req, res) => {
    try {
      // Menghapus pengguna berdasarkan ID yang di-set oleh middleware auth
      const user = await User.findByIdAndDelete(req.userId);
      
      // Jika pengguna tidak ditemukan, kembalikan status 404
      if (!user) return res.status(404).send('User not found');

      // Kirim respons sukses setelah penghapusan
      res.status(200).json({ message: 'User deleted successfully', user });
    } catch (err) {
      // Tangani kesalahan server
      res.status(500).json({ error: err.message });
    }
  }
];
