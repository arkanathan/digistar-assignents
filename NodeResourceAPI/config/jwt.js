const jwt = require('jsonwebtoken');

// Menggunakan JWT secret key dari .env
const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const token = req.cookies['access_token'] || req.headers['authorization'];

  if (!token) return res.status(403).send("Token tidak tersedia");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Tidak sah!");
    req.user = decoded;
    next();
  });
};
