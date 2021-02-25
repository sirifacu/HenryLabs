const express = require('express');
const { Cohort, User, Role } = require('../sqlDB.js')
const router = express.Router();

// Create cohort
router.post("/", (req, res) => {
    const { title, number, initialDate, instructor} = req.body
    Cohort.create({title, number, initialDate})
    .then(async cohort => {
        const user = await User.findByPk(instructor)
        cohort.addUser(user)
        res.json(cohort)
    })
    .catch(error =>{
        res.status(500).send(error)
    })
})

// Get all cohorts
router.get('/', async (req, res, next) => {
    try {
        Cohort.findAll().then(response => {
            res.json(response);
        })
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        })
        next(e);
    }
})

// Get cohort's instructor
router.get('/:id/instructor', async (req, res, next) => {
    try{
        const { id } = req.params
        const cohort = await Cohort.findOne({
            where: {id},
            include: [
                {
                    model: User,
                    include: [
                        {
                            model: Role, 
                            as: 'roles', 
                            where: {
                                name: 'Instructor'
                            },
                            attributes: []
                        }
                    ],
                    attributes: ['id', 'firstName', 'lastName']
                }, 
            ]
        })
        res.json(cohort);
    } catch (e) {
        res.status(500).send({
            message: 'Cohort not found'
        })
        next(e);
    }
})


// Get one cohort by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const cohort = await Cohort.findByPk(id)
        res.json(cohort);
    } catch (e) {
        res.status(500).send({
            message: 'Cohort not found'
        })
        next(e);
    }
})


// Associate user to cohort
router.post('/:cohortId/user/:userId', async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    const cohort = await Cohort.findByPk(req.params.cohortId);
    
    await cohort.addUser(user)
        .then(response => res.send(response))
})

// List users that belong to cohort
router.get("/:cohortId/user", async (req, res) => {
    
    const cohort = await Cohort.findAll({
        where: {
            id: req.params.cohortId
        },
        include: [
            {model: User}
        ]
    })
    .then(cohorts => {
        res.send(cohorts)
    })
})

module.exports = router

