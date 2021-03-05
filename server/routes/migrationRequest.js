const express = require('express');
const { User, Cohort, MigrationRequest } = require('../sqlDB.js');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get('/listAll', async (req, res, next) => {
    try {
        const { status } = req.query;
        if(status){
            const requests = await MigrationRequest.findAll({where : {status}});
        } else {
            const requests = await MigrationRequest.findAll();
        }
        res.json(requests);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

router.post('/createRequest/user/:userId/cohort/:cohortNumber', async (req, res, next) => {
    const { userId, cohortNumber } = req.params;
    const { reason } = req.body;
    try {
        const user = await User.findByPk(userId);
        console.log(cohortId);
        const migrationRequest = await MigrationRequest.create({
            id: uuidv4(),
            reason,
            migrateCohortNumber: cohortNumber
        });
        user.addMigrationRequest(migrationRequest);
        res.json(user);
    } catch (e) {
        res.status(500).json({message: "There has been an error."})
        next(e)
    };
});

router.put('/changeStatus/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const request = await MigrationRequest.findByPk(id);
        if(request.status === 'pending'){
            request.status = 'done'
        } else if (request.status === 'done') {
            request.status = 'pending'
        }
        request.save();
        res.json(request);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    };
});

module.exports = router;
