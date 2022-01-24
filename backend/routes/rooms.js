const express = require('express');
const router = express.Router();
const rooms = require('../models/room');
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
    const _rooms = await rooms.find({}).sort('label');
    res.json(_rooms.map(r => r.label));
}));

router.put("/", security.staff_and_up, aw(async (req, res) => {
    const room = req.body.room.toUpperCase();
    const existing = await rooms.findOne({ room: room });
    if (existing) {
        return res.sendStatus(200);
    }
    const add = {
        label: room
    }
    await rooms.create(add);
    res.sendStatus(200);
}));

router.delete("/", security.staff_and_up, aw(async (req, res) => {
    console.log(req.body);
    const room = req.body.room.toUpperCase();
    await rooms.deleteMany({ label: room });
    res.sendStatus(200);
}));

module.exports = router;