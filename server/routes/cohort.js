const express = require('express');
const { Cohort, User } = require('../sqlDB.js')
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cohorts = await Cohort.findAll();
        res.json(cohorts);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        })
    }
})
//router.post()
//router.delete()

module.exports = router