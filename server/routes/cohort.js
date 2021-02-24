const express = require('express');
const { Cohort } = require('../sqlDB.js')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// get all Cohorts
router.get('/get/all', async (req, res, next) => {
    try {
        const allCohorts = await Cohort.findAll()
        res.send(allCohorts);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    }
});


//Get a one cohort info by id
router.get('/get/cohort/:cohortId', async (req, res, next) => {
    const { cohortId } = req.params;
    try{
        const cohortInfo = await Cohort.findOne({
            where: {id: cohortId}
        })
        res.send(cohortInfo)
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
})

// add a new Cohort
router.post('/add/newCohort', async (req, res, next) => {
    const { name, num, pdfLinks } = req.body;
    try {
        const newCohort = await Cohort.create({
            id: uuidv4(),
            name,
            num,
            pdfLinks
        });
        Cohort.addFeedback(newCohort);
        
        res.send(Cohort);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
})


//Update cohort info
router.post('/edit/cohort/:cohortId', async (req, res, next) => {
    const { cohortId } = req.params;
    const { name, num, pdfLinks} = req.body;
    try {
        const cohort = await Cohort.update({ name, num, pdfLinks }, { where: {id: cohortId} });
        lecture.save()
        res.json(cohort);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        })
        next(err);
    }
})



module.exports = router;