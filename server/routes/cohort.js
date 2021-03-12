const passport = require('passport')
const { staffAndInstructor } = require("./helpers/authRoles");
const express = require('express');
const { Cohort, User, Role } = require('../sqlDB.js')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

// Create cohort
router.post("/create", passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
    try{
        const { title, number, initialDate, instructor_id, instructor_name} = req.body
        const obj = { id: uuidv4(), title, number, initialDate, instructor_id, instructor_name}
        const prevCohort = await Cohort.findOne({where: {number}})
        if(!prevCohort){
            const cohort = await Cohort.create(obj)
            res.json(cohort)
        } else {
            res.json({message: "El número de cohorte ya existe."})
        }
    }
    catch (e) {
        res.status(500).json({message: "error al crear el cohorte"})
        next(e)
    }
})

// Update cohort info
router.post('/one/edit/:cohortId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
    try{
        const { cohortId } = req.params;
        const { title, number, initialDate, instructor_id, instructor_name} = req.body
        const prevCohort = await Cohort.findOne( {where: { number } })
        if(!prevCohort){
            const cohort = await Cohort.update({ title, number, initialDate, instructor_id, instructor_name}, { where: {id: cohortId} });
            res.json(cohort)
        }
        else {
            if(prevCohort.id === cohortId ){   
                const cohort = await Cohort.update({ title, number, initialDate, instructor_id, instructor_name}, { where: {id: cohortId} });
                res.json(cohort)
            } else {
                res.json({message: "Ya existe un cohorte con ese numero."})
            }
        }
        
    } catch (err) {
        res.status(500).send({message: 'Hubo un error al actualizar el cohorte'})
        next(err);
    }
});

// Get all cohorts
router.get('/getAll', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
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
router.get('/:id/instructor', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
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
router.get('/get/cohort/:cohortId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
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

// Change user from one cohort to another
router.post('/:cohortId/user/:userId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
    try {
        const { userId, cohortId } = req.params;
        const user = await User.findOne({
            where: {id: userId},
            include: [{model: Cohort}]
        });
        if(user.cohorts[0]?.id !== cohortId) {
            if(user.cohorts.length){
                const prevCohort = await Cohort.findByPk(user.cohorts[0].id)
                user.removeCohort(prevCohort)
            }
            const cohort = await Cohort.findByPk(cohortId);
            cohort.addUser(user)
            res.json(user)
        } else {
            res.json({message: "Un usuario seleccionado ya estaba asociado a ese cohorte"})
        }
    } catch (e) {
        res.status(500).json({message: 'There has been an error'})
        next(e)
    }
});


// Associate Pm to cohort
router.post('/:cohortId/pm/:userId', async (req, res, next) => {
    try {
        const { userId, cohortId } = req.params;
        const user = await User.findOne({
            where: {id: userId},
            include: [{model: Cohort}]
        })
        const studentCohort = await Cohort.findByPk(cohortId)
        const pmCohort = await Cohort.findOne({
            where: {number: studentCohort.number}
        })
        pmCohort.addUser(user)
        res.json(user)
    } catch (e) {
        res.status(500).json({message: "There has been an error."})
        next(e)
    }
})

// Update user's migration quantity field
router.put('/changeMigrationQuantity/:userId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (isNaN(parseInt(user.migrationsQuantity))) user.migrationsQuantity = 0;
        else user.migrationsQuantity += 1;
        user.save();
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'There has been an error'})
        next(e)
    }
});

// Get student's cohort
router.get('/user/:userId', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
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
    const { cohortId } = req.params;
    const users = await User.findAll({
        include: [{
            model: Cohort,
            where: {id: cohortId}
        }]
    })
    res.json(users)
})

router.get('/:id/pm', async (req, res, next) => {
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
                                name: 'pm'
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

module.exports = router;
