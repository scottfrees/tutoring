const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema({
    label: {
        type: String,
        required: true
    }
});


const rooms = mongoose.model('room', s);

module.exports = rooms;