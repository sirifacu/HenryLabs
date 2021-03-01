const express = require('express');
const { Cohort, User, Role } = require('../sqlDB.js')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Create cohort
router.post("/create", async (req, res, next) => {
    try{
        const { title, number, initialDate, instructor_id, instructor_name} = req.body
        const obj = { id: uuidv4(), title, number, initialDate, instructor_id, instructor_name}
        const cohort = await Cohort.create(obj)
        res.json(cohort)
    }
    catch (e) {
        res.status(500).json({message: "error al crear el cohorte"})
        next(e)
    }
})

// Get all cohorts
router.get('/getAll', async (req, res, next) => {
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
//Get a one cohort info by id
router.get('/get/cohort/:cohortId', async (req, res, next) => {
    const { cohortId } = req.params;
    try{
        const cohortInfo = await Cohort.findOne({
            where: {id: cohortId}
        })
        res.json(cohortInfo)
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});


// Update cohort info
router.post('/edit/cohort/:cohortId', async (req, res, next) => {
    const { cohortId } = req.params;
    const { name, num, pdfLinks} = req.body;
    try {
        const cohort = await Cohort.update({ name, num, pdfLinks }, { where: {id: cohortId} });
        res.json(cohort);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        })
        next(err);
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
    const users = await Cohort.findAll({
        where: {
            id: req.params.cohortId
        },
        include: [
            {model: User}
        ]
    })
    .then(users => {
        res.send(users)
    })
})

module.exports = router;
