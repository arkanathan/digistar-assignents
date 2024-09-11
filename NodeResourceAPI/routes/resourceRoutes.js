const express = require('express');
const addTtimestamps = require('../middlewares/timestamp');
const softDelete = require('../middlewares/softDelete');
const Resource = require('../models/Resource');

const router = express.Router();

/**
 * Membuat resource baru (Create)
 * Menggunakan middleware timestamp untuk menambahkan createdAt dan updatedAt
 */
router.post('/resource', addTtimestamps, async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat resource', error });
    }
});

/**
 * Mendapatkan semua resource yang belum dihapus (Read)
 */
router.get('/resource', async (req, res) => {
    try {
        const resources = await Resource.find({ deleted: { $ne: true } }); // Filter soft delete
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil resource', error });
    }
});

/**
 * Memperbarui resource berdasarkan ID (Update)
 * Menggunakan middleware timestamp untuk memperbarui updatedAt
 */
router.put('/resource/:id', addTtimestamps, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedResource = await Resource.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource tidak ditemukan' });
        }

        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui resource', error });
    }
});

/**
 * Menghapus resource secara soft delete (Delete)
 * Menggunakan middleware soft delete untuk menandai resource sebagai dihapus
 */
router.delete('/resource/:id', softDelete(Resource), (req, res) => {
    // Logika soft delete ada di middleware
});

module.exports = router;
