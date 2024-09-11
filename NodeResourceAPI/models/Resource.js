const mongoose = require('mongoose');

// Skema Mongoose untuk Resource
const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false // Flag untuk soft delete
    }
});

// Middleware mongoose untuk memperbarui `updatedAt` sebelum menyimpan
ResourceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Membuat model Resource berdasarkan skema
const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;
