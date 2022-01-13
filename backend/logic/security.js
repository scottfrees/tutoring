const assert = require('assert');
const Users = require('../models/user');

const admin_only = (req, res, next) => {
    const user = req.session.user;
    if (!Users.is_admin(user)) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

const staff_and_up = (req, res, next) => {
    const user = req.session.user;
    if (!Users.is_admin(user) && !Users.is_staff(user)) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

exports.admin_only = admin_only;
exports.staff_and_up = staff_and_up;