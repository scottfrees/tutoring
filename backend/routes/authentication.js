const express = require('express');
const router = express.Router();
const users = require('../models/user');
const aw = require('../middleware/async_wrap');
const authenticator = require('../logic/rcnj-auth');

router.post("/user", (req, res) => {
    res.json(req.session.user);
});


router.post("/logout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

router.post('/login', aw(async (req, res) => {
    const is_allowed = await authenticator.authenticate(req.body.username, req.body.password);
    if (!is_allowed) {
        console.error(`-!- Unauthorized access attempt by user [${req.body.username}]`);
        return res.sendStatus(401);
    }
    let _username = req.body.username;
    if (req.body.username.indexOf("@") < 0) {
        _username += "@ramapo.edu"
    }

    // Check if Admin, Staff, or a Tutor and populate the person into the 
    // session. Otherwise, this is simply a visitor, store the email address
    // entered into the session for logging purposes.
    let user = await users.findOne({ email: _username });
    console.log(_username);
    console.log(user);
    if (!user) {
        req.session.user = { email: _username, roles: ['visitor'] }
    }
    else {
        req.session.user = user;
    }
    res.json(req.session.user);
}));

module.exports = router;
