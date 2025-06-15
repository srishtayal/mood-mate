const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now, required: true },
    text : { type: String, required: true },
    mood: { type: String },
    tags: {String},
    summary: { type: String },
    affirmations: [String]
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);