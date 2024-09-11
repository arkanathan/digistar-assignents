const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // Mengambil kunci rahasia JWT

// Middleware untuk memverifikasi token JWT dari cookie atau header
exports.verifyToken = (req, res, next) => {
  const token = req.cookies['access_token'] || req.headers['authorization']; // Cek token dari cookie atau header

  if (!token) return res.status(403).send("Token tidak tersedia"); // Jika token tidak ada, kembalikan error

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Tidak sah!"); // Jika token tidak valid, kembalikan status 401
    req.user = decoded; // Simpan data pengguna ke dalam request
    next(); // Lanjutkan ke fungsi berikutnya
  });
};
