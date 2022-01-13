const express = require('express');
const router = express.Router();
const users = require('../models/user');
const aw = require('../middleware/async_wrap');
const security = require('../logic/security');

router.use((req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
    } else {
        next();
    }
});


router.get("/", security.staff_and_up, aw(async (req, res) => {
    const _users = await users.find({});
    res.json(_users);
}));

router.put("/", security.staff_and_up, aw(async (req, res) => {
    const add = {
        name: {
            first: req.body.name.first.trim(),
            last: req.body.name.last.trim()
        },
        email: req.body.email.trim(),
        roles: req.body.roles
    }
    await users.create(add);
    res.sendStatus(200);
}));
router.patch("/:id", security.staff_and_up, aw(async (req, res) => {
    const edit = {
        name: {
            first: req.body.name.first.trim(),
            last: req.body.name.last.trim()
        },
        email: req.body.email.trim(),
        roles: req.body.roles
    }
    await users.updateOne({ _id: req.params.id }, { $set: edit });
    res.sendStatus(200);
}));
router.delete("/:id", security.staff_and_up, aw(async (req, res) => {
    await users.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
}));

module.exports = router;