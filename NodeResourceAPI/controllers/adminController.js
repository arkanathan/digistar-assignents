// Fungsi untuk mengambil semua pengguna dari database
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}); // Ambil semua data pengguna
      res.status(200).json(users); // Kirimkan daftar pengguna sebagai respons
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
    }
  };
  