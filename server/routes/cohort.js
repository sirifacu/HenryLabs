const express = require('express');
const { Cohort, User } = require('../sqlDB.js')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cohorts = await Cohort.findAll();
        res.json(cohorts);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        })
        next(e);
    }
})

//obtener un solo cohorte

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const cohort = await Cohort.findByPk(id)
        console.log(cohort)
        res.json(cohort);
    } catch (e) {
        res.status(500).send({
            message: 'Cohort not found'
        })
        next(e);
    }
})


// Agregar usuario a cohorte processing

router.post('/:cohortId/user/:userId', async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    const cohort = await Cohort.findByPk(req.params.cohortId);
    
    await cohort.addUser(user)
        .then(response => res.send(response))
})

router.get("/:cohortId/user", async (req, res) => {
    const cohort = await Cohort.findAll({
        where: {
            number: req.params.cohortId
        },
        include: [
            {model: User}
        ]
    })
    .then(cohort => {
        res.send(cohort)
    })
})

router.post("/", (req, res) => {
    Cohort.create(req.body)
    .then(cohort => {
        return res.status(200).send(cohort)
    })
    .catch(error =>{
        res.status(500).send(error)
    })
})
//router.delete()

module.exports = router

