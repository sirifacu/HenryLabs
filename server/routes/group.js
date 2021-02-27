const express = require('express');
const { Cohort, User, Role, Group } = require('../sqlDB.js')
const router = express.Router();


//Get all groups
router.get('/getAll', async (req, res, next) => {
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
router.get('/:id/users', async (req, res, next) =>{
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
                                name: 'Student'
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
router.post('/:groupId/user/:userId', async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    const group = await Group.findByPk(req.params.groupId);

    await group.addUser(user)
        .then(response => res.send(response))
})