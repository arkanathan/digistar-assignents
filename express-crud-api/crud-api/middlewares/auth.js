// middleware/auth.js
const authMiddleware = (req, res, next) => {
    // Mendapatkan ID pengguna dari header atau query parameter
    const userId = req.header('User-ID') || req.query.userId;
  
    if (!userId) {
      return res.status(401).json({ message: 'Belum login. User ID is required.' });
    }
  
    // Menyimpan ID pengguna di request object untuk digunakan di controller
    req.userId = userId;
    
    next();
  };
  
  module.exports = authMiddleware;
  