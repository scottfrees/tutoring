const express = require('express');
const router = express.Router();
const logs = require('../models/searchLog');
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
    const results = await logs.find({}).sort('date');
    console.log(results)


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
            if (elapsed < 10000 && neighbor.search.indexOf(merged.search) === 0) {
                // This neighbor contains the merged, so update the merged with this one
                merged = neighbor;

            }
        }
        // Multiple results may lead to the same merged value.  The merged value is the superset of 
        // of all the incremental search terms.  We don't want multiple incremental searches to be in the 
        // processed set, so we tag with sdate and getTime to avoid.
        processed.set(`${merged.sdate}-${merged.date.getTime()}-${merged.search}`, merged);
    }



    res.json(Array.from(processed.values()));
}));

module.exports = router;