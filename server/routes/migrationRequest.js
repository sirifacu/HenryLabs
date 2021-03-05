const express = require('express');
const { User, Cohort, MigrationRequest } = require('../sqlDB.js');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Get all migrations requests
router.get('/listAll', async (req, res, next) => {
    try {
        const { status } = req.query;
        if(status){
            const requests = await MigrationRequest.findAll({
                where : {status},
                include: [
                    {
                        model: User,
                        attributes: ['id', 'fullName']
                    }
                ]
            });
        } else {
            const requests = await MigrationRequest.findAll();
        }
        res.json(requests);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

// Create new migration request
router.post('/createRequest/user/:userId', async (req, res, next) => {
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
router.put('/changeStatus/:id', async (req, res, next) => {
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
