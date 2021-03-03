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
                                name: 'instructor'
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
    try {
        const { userId, cohortId } = req.params;
        const user = await User.findByPk(userId);
        const cohort = await Cohort.findByPk(cohortId);
        cohort.addUser(user)
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'There has been an error'})
        next(e)
    }
});

// Disassociate user to cohort
router.delete('/remove/:cohortId/user/:userId', async (req, res, next) => {
    try {
        const { userId, cohortId } = req.params;
        const user = await User.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: Cohort
                }
            ]
        });
        const cohort = await Cohort.findByPk(cohortId);
        if(user.cohorts.length){
            cohort.removeUser(user)
        } else {
            res.json({message: "El usuario no está asociado a ese cohort."})
        }
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'There has been an error'})
        next(e)
    }
})

router.put('/changeMigrationQuantity/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (isNaN(parseInt(user.migrationsQuantity))) user.migrationsQuantity = 0;
        else user.migrationsQuantity++;
        user.save();
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'There has been an error'})
        next(e)
    }
});

// Get student's cohort
router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cohort = await Cohort.findAll({
            include: [
                {
                    model: User,
                    where: { id: userId}
                }
            ]
        })
        res.json(cohort);
    } catch (e) {
        res.status(500).json({message: 'There has been an error'});
        next(e)
    }
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
