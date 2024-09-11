const mongoose = require('mongoose');

// Fungsi untuk koneksi ke MongoDB
const connectDB = async () => {
    try {
        // Gunakan variabel environment untuk URI MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Terhubung: ${conn.connection.host}`);
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB', error);
        process.exit(1); // Keluar dari aplikasi jika gagal terhubung
    }
};

module.exports = connectDB;
