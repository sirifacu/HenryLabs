const express = require('express');
const { Cohort, User, Role, Group } = require('../sqlDB.js')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


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
router.post('/:groupId/user/:userId', async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    const group = await Group.findByPk(req.params.groupId);

    await group.addUser(user)
        .then(response => res.send(response))
})

//Delete Group
router.delete("/:groupId", async(req, res, next) => {
    const id = req.params.groupId;
    Group.destroy({
      where: {
        id,
      },
    })
      .then((group) => {
        if (group) {
          res.status(200).send(`The user has been deleted`);
        } else {
          res.status(400).send(`We couldn't find the user with id: ${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
});

//creates a group and asings to a cohort
router.post('/create', async (req, res, next) => {
    try{
        const { title, number, pm1, pm2, cohortid } = req.body
        const obj = { id: uuidv4(), title, number, pm1, pm2 }
        const group = await Group.create(obj)
        const cohort  = await Cohort.findByPk(cohortid)
        cohort.addGroup(group)
        res.json(group)
    }
    catch (e) {
        res.status(500).json({message: "error al crear el grupo"})
        next(e)
    }
})

//add Pm to group
router.post('/:groupId/user/:userId', async(req, res, next) => {
    const userId = req.params
    const group = await Group.findByPk(req.params.groupId)
    const user = await User.findOne({
        where: userId,
        include: [
            {
                model: User,
                include: [
                    {
                        model: Role,
                        as: 'roles',
                        where: {
                            name: 'Pm'
                        },
                        attributes: []
                    }
                ],
                attributes: ['id', 'firstName', 'lastName', 'email']
            }
        ]
    })
    await group.addUser(user)
        .then(response => res.send(response))
})


module.exports = router;
