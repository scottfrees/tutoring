const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const s = new Schema({
    crn: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    school: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true
    },
    days: {  // Campus-based classes only.
        MON: Boolean,
        TUE: Boolean,
        WED: Boolean,
        THU: Boolean,
        FRI: Boolean,
        SAT: Boolean,
        SUN: Boolean
    },
    ///////////////////
    start: String,
    end: String,
    delivery: {
        type: String,
        enum: enums.delivery.values
    },
    instructor: {
        name: {
            first: String,
            last: String
        },
        email: String
    }
});
