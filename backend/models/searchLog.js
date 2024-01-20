const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema({
    search: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        expires: 60 * 60 * 24 * 180 // 180 days
    },
    sdate: {
        type: String,
    },

    results: {
        type: Number,
        required: true
    },
    resultsDetails: {
        type: String
    }
});


const sl = mongoose.model('searchLog', s);

module.exports = sl;