const express = require('express');
const passport = require('passport')
const { isStaff, isInstructor, staffAndInstructor } = require("./helpers/authRoles");
const { User, Cohort, MigrationRequest } = require('../sqlDB.js');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Get all migrations requests
router.get('/listAll', passport.authenticate('jwt', { session: false }), isStaff,
  async (req, res, next) => {
    try {
        const { status } = req.query;
        let requests;
        if(status){
            requests = await MigrationRequest.findAll({
                where : {status},
                include: [
                    {
                        model: User,
                        include: [
                            {
                                model: Cohort,
                                attributes: ['title', 'number']
                            }
                        ]
                    }
                ]
            });
        } else {
            requests = await MigrationRequest.findAll();
        }
        res.json(requests);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

// Get pending migration by user id
router.get('/listOne/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const request = await MigrationRequest.findOne({
            where: {status: "pending"},
            include: [{
                model: User,
                where: {id: userId}
            }]
        })
        request ? res.json(request) : res.json({message: "Podes hacer una petición."});
    } catch (e) {
        res.status(500).json({message: "There has been a problem"});
        next(e);
    };
})

// Create new migration request
router.post('/createRequest/user/:userId', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { userId } = req.params;
    const { reason, wishedStartingDate } = req.body;
    try {
        const user = await User.findByPk(userId);
        const migrationRequest = await MigrationRequest.create({ id: uuidv4(), reason, wishedStartingDate });
        user.addMigrationRequest(migrationRequest);
        res.json(user);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

// Change migration request status
router.put('/changeStatus/:id', passport.authenticate('jwt', { session: false }), isStaff,
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const request = await MigrationRequest.findByPk(id);
        request.status = status;
        request.save();
        res.json(request);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

module.exports = router;
