require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');  // Import fungsi untuk koneksi ke MongoDB
const errorHandler = require('./middlewares/errorHandler');
const addTimestamps = require('./middlewares/timestamp');
const geoRestrict = require('./middlewares/geoRestrict');
const softDelete = require('./middlewares/softDelete');
const resourceRoutes = require('./routes/resourceRoutes');  // Import rute resource

const app = express();

// Middleware parsing JSON dan cookie
app.use(express.json());
app.use(cookieParser());

// Hubungkan ke MongoDB
connectDB();  // Panggil fungsi koneksi dari db.js

// Implementasi rute resource dengan middleware yang dibutuhkan
app.use('/api/resource', resourceRoutes);  // Gunakan rute resource

// Middleware error handler global
app.use(errorHandler);

// Jalankan server pada port yang ditentukan
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
