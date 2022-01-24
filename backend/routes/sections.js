const express = require('express');
const router = express.Router();
const sections = require('../models/section');
const aw = require('../middleware/async_wrap');
const security = require('../logic/security');

router.use((req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
    } else {
        next();
    }
});


router.get("/:term/subjects", security.staff_and_up, aw(async (req, res) => {
    const subjects = await sections.distinct('subject', { term: req.params.term })
    subjects.sort();
    res.json(subjects);
}));

router.get("/:term/subjects/:subject/numbers", security.staff_and_up, aw(async (req, res) => {
    const courses = await sections.distinct('searchable', { term: req.params.term, subject: req.params.subject })
    courses.sort();
    res.json(courses);
}));

router.get("/:term/subjects/:subject/numbers/sections", security.staff_and_up, aw(async (req, res) => {
    const _sections = await sections.find({ searchable: req.query.searchable }).sort('section');
    res.json(_sections);
}));



module.exports = router;