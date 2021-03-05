const express = require('express');
const passport = require('passport')
const { Lecture, Cohort } = require('../sqlDB.js')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all lectures
router.get('/listAll', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cohortId } = req.query
        if(cohortId){
            const lectures = await Lecture.findAll({where: {cohortId}})
            res.json(lectures)
        } else {
            const lectures = await Lecture.findAll();
            res.json(lectures)
        }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Get one teacher's lectures of and specific module
router.get('/list/module/:module/user/:userId', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { module, userId } = req.params;
        const lectures = await Lecture.findAll({
            where: {module: parseInt(module), userId}
        });
        res.json(lectures);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Get one lecture
router.get('/list/lecture/:lectureId', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        const lecture = await Lecture.findOne({
            where: {
                id: lectureId
            },
            attributes: ['id', 'title', 'module','description', 'videoURL', 'githubURL', 'cohortId']
        });
        res.send(lecture);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

// Get all teacher's lecture
router.get('/list/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const lectures = await Lecture.findAll({ where: {userId} });
        res.json(lectures);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Add a new lecture
router.post('/add/:cohortId/', async (req, res, next) => {
    try {
        const { cohortId } = req.params;
        const { title, module, description, videoURL, githubURL } = req.body;
        const id = uuidv4();
        const lecture = await Lecture.create({
            id, title, module, description, videoURL, githubURL
        });
        lecture.cohortId = cohortId
        lecture.save()
        res.json(lecture);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Update a lecture
router.put('/update/:lectureId', async (req, res, next) => {
    try {
        const { lectureId } = req.params
        const { title, module, description, videoURL, githubURL } = req.body;
        const lecture = await Lecture.update({
            title, module, description, videoURL, githubURL
        }, { where: {id: lectureId} });
        res.json(lecture);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Delete a lecture
router.delete('/remove/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const lecture = await Lecture.findByPk(id);
        lecture.destroy()
        res.json(lecture);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

module.exports = router
