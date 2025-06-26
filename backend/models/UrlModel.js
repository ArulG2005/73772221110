const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true,"Please enter the url"]
    },

    shortcode: {
        type: String,
        unique: [true,"This is unique please give another shortcode"]
    },

    shortUrl: {
        type: String
    },

    validate: {
        type: Date

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Url', urlSchema);
