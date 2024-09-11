// middlewares/timestamp.js

// Middleware untuk menambahkan timestamp secara otomatis
function addTimestamps(req, res, next) {
    const currentTime = new Date();

    // Jika metode request adalah POST, tambahkan createdAt dan updatedAt
    if (req.method === 'POST') {
        req.body.createdAt = currentTime;
        req.body.updatedAt = currentTime;
    } 
    // Jika metode request adalah PUT atau PATCH, hanya tambahkan updatedAt
    else if (req.method === 'PUT' || req.method === 'PATCH') {
        req.body.updatedAt = currentTime;
    }
    
    // Panggil middleware selanjutnya
    next();
}

module.exports = addTimestamps;
