const express = require('express');
const router = express.Router();
const tutoring = require('../models/tutoring');
const searchLogs = require('../models/searchLog');
const aw = require('../middleware/async_wrap');
const security = require('../logic/security');

router.use((req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
    } else {
        next();
    }
});


router.get("/", aw(async (req, res) => {
    const search = req.query.search;
    let results = []
    const query = {};

    if (search && search.trim().length) {
        query.$text = { $search: search };
    }
    results = await tutoring.find(query).populate('supervisor').populate({ path: 'schedules', populate: { path: 'tutor' } });
    res.json(results);
}));

router.get("/:date", aw(async (req, res) => {
    const search = req.query.search;
    let results = []
    const query = {};
    if (search && search.trim().length) {
        // Production has Mongo 2.6, which does not support caseSenstive flag 
        query.$text = { $search: search/*, $caseSensitive: false */ };
    }
    query['schedules.start'] = { $lte: req.params.date };
    query['schedules.end'] = { $gte: req.params.date };
    console.log(query);
    results = await tutoring.find(query).populate('supervisor').populate({ path: 'schedules', populate: { path: 'tutor' } });

    if (search && search.trim().length) {
        const searchLog = {
            date: new Date(),
            sdate: req.params.date,

            search: search,
            results: results.length,
            resultsDetails: results.map(r => r.title).join(", ")
        }
        searchLogs.create(searchLog);
    }



    res.json(results);
}));

router.put("/", security.staff_and_up, aw(async (req, res) => {
    const created = await tutoring.create(req.body);
    res.json(created);
}));

router.patch("/:id", security.staff_and_up, aw(async (req, res) => {
    delete req.body._id;
    await tutoring.updateOne({ _id: req.params.id }, { $set: req.body });
    const edited = await tutoring.findById(req.params.id);
    res.json(edited);
}));

router.delete("/:id", security.staff_and_up, aw(async (req, res) => {
    await tutoring.deleteOne({ _id: req.params.id })
    res.sendStatus(200);
}));

module.exports = router;