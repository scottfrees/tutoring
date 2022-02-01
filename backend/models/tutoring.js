const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema({
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    notes: {
        type: String
    },
    title: {
        type: String
    },
    courses: [{
        type: String
    }],
    schedules: [{
        M: {
            type: Boolean
        },
        T: {
            type: Boolean
        },
        W: {
            type: Boolean
        },
        R: {
            type: Boolean
        },
        F: {
            type: Boolean
        },
        S: {
            type: Boolean
        },
        U: {
            type: Boolean
        },
        virtual: {
            type: Boolean
        },
        virtual_link: {
            type: String
        },
        appointment: {
            type: Boolean
        },
        room: {
            type: String
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        start_time: {
            type: String
        },
        end_time: {
            type: String
        },
        tutor: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        exceptions: [{
            type: String
        }]
    }]
});

s.index({
    courses: 'text', title: 'text'
});

const tutoring = mongoose.model('tutoring', s);

module.exports = tutoring;