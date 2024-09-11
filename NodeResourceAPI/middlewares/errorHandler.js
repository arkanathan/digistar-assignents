// Middleware global untuk menangani error
const errorHandler = (err, req, res, next) => {
  // Status error default adalah 500 (Server Error)
  const statusCode = err.statusCode || 500;

  // Tampilkan error di console saat pengembangan
  console.error(err.message, err.stack);

  // Kirimkan respons JSON dengan status code dan pesan error
  res.status(statusCode).json({
    message: err.message || "Terjadi kesalahan di server",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Jangan tampilkan stack trace di produksi
  });
};

module.exports = errorHandler;
