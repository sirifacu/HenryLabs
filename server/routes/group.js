const passport = require('passport')
const { isStaff, isInstructor, isStudent } = require("../auth");
const express = require('express');
const { Cohort, User, Role, Group } = require('../sqlDB.js')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


//Get all groups
router.get('/getAll', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        Group.findAll().then(response => {
            res.json(response)
        })
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        })
        next(e)
    }
})

//Get one Group by id and get users
router.get('/:id/users', passport.authenticate('jwt', { session: false }), async (req, res, next) =>{
    const id = req.params;
    try {
        const group = await Group.findOne({
            where: id,
            include: [
                {
                    model: User,
                    include: [
                        {
                            model: Role,
                            as: 'roles',
                            where: {
                                name: 'student'
                            },
                            attributes: []
                        }
                    ],
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
            ]
        })
        res.json(group);
    } catch (e) {
        res.status(500).send({
            message: 'Group not found'
        })
        next(e)
    }
})

//Asociate user to group
router.post('/:groupId/user/:userId', passport.authenticate('jwt', { session: false }), isStaff, isInstructor,
  async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    const group = await Group.findByPk(req.params.groupId);

    await group.addUser(user)
        .then(response => res.send(response))
})

router.post('/create', async (req, res, next) => {
    try{
        const { title, number } = req.body
        const obj = { id: uuidv4(), title, number }
        const group = await Group.create(obj)
        res.json(group)
    }
    catch (e) {
        res.status(500).json({message: "error al crear el grupo"})
        next(e)
    }
})

module.exports = router;
