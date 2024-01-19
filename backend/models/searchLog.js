const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema({
    search: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
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