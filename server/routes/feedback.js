const express = require('express');
const { Feedback, User, Lecture } = require('../sqlDB.js')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/listAll/:lectureId', async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Lecture,
                    where: {
                        id: lectureId
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'email']
                }
            ]
        });
        res.send(feedbacks);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    }
});

router.get('/list/user/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const feedbacks = await Feedbacks.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email']
                }
            ]
        });
        res.send(feedbacks);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.get('/feedback/:feedbackId', async (req, res, next) => {
    const { feedbackId } = req.params;
    try {
        const feedback = await Feedback.findOne({
            where: {
                id: feedbackId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email']
                }
            ]
        });
        res.send(feedback);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.get('/average/user/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const average = await Feedback.findAll({
            where: {
                userId
            },
            attributes: [
                [ sequelize.fn('AVG', sequelize.col('rating')), 'AvgRating' ]
            ]
        });
        const avg = Number(average[0].dataValues.AvgRating);
        res.send(avg);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.get('/average/lecture/:lectureId', async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        const average = await Feedback.findAll({
            where: {
                lectureId
            },
            attributes: [
                [ sequelize.fn('AVG', sequelize.col('rating')), 'AvgRating' ]
            ]
        });
        const avg = Number(average[0].dataValues.AvgRating);
        res.send(avg);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.post('/feedback', async (req, res, next) => {
    const { userId, rating, comment, lectureId } = req.body;
    try {
        const feedback = await Feedback.create({
            id: uuidv4(),
            rating,
            comment
        });
        const lecture = await Lecture.findByPk(lectureId);

        lecture.addFeedback(feedback);
        
        res.send(feedback);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.put('/feedback/:feedbackId', async (req, res, next) => {
    const { feedbackId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        const feedback = await Feedback.findByPk(feedbackId);
        Object.assign(feedback, { rating, comment });
        feedback.save();
        res.send(feedback);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

router.delete('feedback/:feedbackId', async (req, res, next) => {
    const { feedbackId } = req.params;
    try {
        const feedback = await Feedback.findByPk(feedbackId);
        feedback.destroy();
        res.send({
            message: 'Feedback removed'
        });
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
    };
});

module.exports = router;
