const express = require('express');
const router = express.Router();
const logs = require('../models/searchLog');
const aw = require('../middleware/async_wrap');
const security = require('../logic/security');
const toxl = require('jsonexcel');

router.use((req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
    } else {
        next();
    }
});

const report = async (req, res) => {
    const results = await logs.find({}).sort('date');

    // Merging results.  For each result, see if there is another result within 2 seconds with the same sdate and use that.
    const processed = new Map();

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        let merged = result;
        const neighbors = results.slice(i + 1).filter(p => p.sdate == result.sdate);
        // Work through each neighbor in order (they are ordered by time).
        for (let j = 0; j < neighbors.length; j++) {
            const neighbor = neighbors[j];
            const elapsed = Math.abs(neighbor.date.getTime() - merged.date.getTime())
            if (elapsed < 5000 && neighbor.search.indexOf(merged.search) === 0) {
                // This neighbor contains the merged, so update the merged with this one
                merged = neighbor;

            }
        }
        // Multiple results may lead to the same merged value.  The merged value is the superset of 
        // of all the incremental search terms.  We don't want multiple incremental searches to be in the 
        // processed set, so we tag with sdate and getTime to avoid.
        processed.set(`${merged.sdate}-${merged.date.getTime()}-${merged.search}`, merged);
    }
    return Array.from(processed.values());
}

router.get("/", security.staff_and_up, aw(async (req, res) => {
    const results = await report(req, res);
    res.json(results);
}));

router.get("/export", security.staff_and_up, aw(async (req, res) => {
    const results = await report(req, res);
    const opts = {
        sheetname: "Search Logs",
        delimiter: "."
    }

    const buffer = toxl(results.map(r => {
        console.log(r.date)
        intlDateObj = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'long',
            timeZone: "America/New_York"
        });
        return {
            "Timestamp": intlDateObj.format(r.date),
            "Search_String": r.search,
            "Search_Date": r.sdate,
            "Results": r.results,
            "Results Details": r.resultsDetails
        }
    }), opts);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Tutoring Search Logs.xlsx");
    res.end(buffer);
}));

module.exports = router;