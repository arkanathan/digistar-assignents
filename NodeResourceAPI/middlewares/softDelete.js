// middlewares/softDelete.js

// Middleware untuk melakukan soft delete pada resource
function softDelete(model) {
    return async (req, res, next) => {
        const { id } = req.params; // Ambil ID dari parameter URL

        // Cari resource berdasarkan ID
        const record = await model.findById(id);
        
        // Jika resource tidak ditemukan, kirim respons 404
        if (!record) {
            return res.status(404).json({ message: 'Resource tidak ditemukan' });
        }

        // Tandai resource sebagai dihapus (soft delete)
        record.deleted = true;
        await record.save();
        
        // Kirim respons berhasil
        res.status(200).json({ message: 'Resource berhasil dihapus (soft delete)' });
    };
}

module.exports = softDelete;
