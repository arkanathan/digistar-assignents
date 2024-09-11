// middlewares/geoRestrict.js

const geoip = require('geoip-lite');

// Middleware untuk membatasi akses berdasarkan negara yang diizinkan
function geoRestrict(allowedCountries) {
    return (req, res, next) => {
        // Dapatkan alamat IP dari permintaan
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const geo = geoip.lookup(ip);
        
        // Jika lokasi IP tidak ditemukan atau negara tidak diizinkan, tolak akses
        if (!geo || !allowedCountries.includes(geo.country)) {
            return res.status(403).json({ message: 'Akses ditolak dari lokasi Anda' });
        }

        // Lanjutkan ke middleware berikutnya jika negara diizinkan
        next();
    };
}

module.exports = geoRestrict;
