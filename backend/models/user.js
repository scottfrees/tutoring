const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String
    },
    roles: [{
        type: String,
        required: true
    }]
});

s.statics.is_admin = (user) => {
    console.log(user);
    return user.roles.filter(r => r === 'admin').length > 0;
}

s.statics.is_staff = (user) => {
    return user.roles.filter(r => r === 'staff').length > 0;
}

s.statics.is_tutor = (user) => {
    return user.roles.filter(r => r === 'tutor').length > 0;
}

const users = mongoose.model('users', s);

module.exports = users;