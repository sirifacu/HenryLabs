const passport = require('passport')
const { isStaff, isInstructor, isStudent, staffAndInstructor } = require("./helpers/authRoles");
const express = require('express');
const Sequelize = require('sequelize');
const { Feedback, User, Lecture, Cohort } = require('../sqlDB.js')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all feedbacks
router.get('/listAllFeedbacks', async (req, res, next) => {
    try {
        const { lectureRating, lectureComment, instructorRating, instructorComment, 
                cohortNumber, lectureTitle, email } = req.query;
        let options = { where: {}, include: [ { model: User, attributes: ['id', 'email']}]};
        if (lectureRating) options.where.lectureRating = lectureRating;
        if (lectureComment) options.where.lectureComment = { [Sequelize.Op.iLike]: `%${lectureComment}%` };
        if (instructorRating) options.where.instructorRating = instructorRating;
        if (instructorComment) options.where.instructorComment = { [Sequelize.Op.iLike]: `%${instructorComment}%` };
        if (lectureTitle && cohortNumber) options.include.push({ 
            model: Lecture,
            where: {
                title: { [Sequelize.Op.iLike]: `%${lectureTitle}%` }
            },
            include: [ { 
                model: Cohort,
                where: {
                    number: cohortNumber
                }
            }] 
        });
        if (cohortNumber && !lectureTitle) options.include.push({ 
            model: Lecture,
            include: [{ model: Cohort, where: { number: cohortNumber },attributes: [] }],
            attributes: []
        });
        if (lectureTitle && !cohortNumber) options.include.push({ model: Lecture, where: { title: { [Sequelize.Op.iLike]: `%${lectureTitle}%` }}})
        if (email) options.include[0].where = { email: { [Sequelize.Op.iLike]: `%${email}%` }};
        
        const feedbacks = await Feedback.findAll(options);
        res.json(feedbacks);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

// Get average ratings
router.get('/average', async (req, res, next) => {
    try {
        const { ratingType, cohortId } = req.query;
        let averageFeedbacks, fiveStars, fourStars, threeStars, twoStars, oneStar, totalFeedbacks;
        let options = {where: {}, include: []};
        if (cohortId) options.include.push({ model: Lecture, include: [{ model: Cohort, where: { id: cohortId } }], attributes: []});
        if (ratingType === 'contents') {
            averageFeedbacks = await Feedback.findAll({
                attributes: [
                    [ Sequelize.fn('AVG', Sequelize.col('lectureRating')), 'AvgRating' ]
                ]
            });
            totalFeedbacks = await Feedback.count({
                include: [{ model: Lecture, include: [{ model: Cohort, where: { id: cohortId } }]}]
            })
            fiveStars = await Feedback.count({
                where: { lectureRating: 5 }
            });
            fourStars = await Feedback.count({
                where: { lectureRating: 4 }
            });
            threeStars = await Feedback.count({
                where: { lectureRating: 3 }
            });
            twoStars = await Feedback.count({
                where: { lectureRating: 2 }
            });
            oneStar = await Feedback.count({
                where: { lectureRating: 1 }
            });
        } else {
            averageFeedbacks = await Feedback.findAll({
                attributes: [
                    [ Sequelize.fn('AVG', Sequelize.col('instructorRating')), 'AvgRating' ]
                ]
            });
            fiveStars = await Feedback.count({
                where: { instructorRating: 5 }
            });
            fourStars = await Feedback.count({
                where: { instructorRating: 4 }
            });
            threeStars = await Feedback.count({
                where: { instructorRating: 3 }
            });
            twoStars = await Feedback.count({
                where: { instructorRating: 2 }
            });
            oneStar = await Feedback.count({
                where: { instructorRating: 1 }
            });
        };
        const data = {
            averageFeedbacks,
            totalFeedbacks,
            fiveStars, 
            fourStars, 
            threeStars, 
            twoStars, 
            oneStar
        };
        res.json(data);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    }
});

// Get all feedbacks from lecture
router.get('/listAll/:lectureId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
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

// Get a feedback from user
router.get('/list/user/:userId/lecture/:lectureId', passport.authenticate('jwt', { session: false }), isStudent,
  async (req, res, next) => {
    const { userId, lectureId } = req.params;
    try {
        const feedback = await Feedback.findOne({
            where: {
                userId,
                lectureId
            },
            attributes: ['id', 'lectureRating', 'lectureComment', 'instructorRating', 'instructorComment']
        });
        res.send(feedback);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next();
    };
});

// Get feedback
router.get('/feedback/:feedbackId', passport.authenticate('jwt', { session: false }), isStudent,
  async (req, res, next) => {
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

// Get average of total from lecture
router.get('/average/lecture/:lectureId', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        const average = await Feedback.findAll({
            where: {
                lectureId
            },
            attributes: [
                [ Sequelize.fn('AVG', Sequelize.col('lectureRating')), 'AvgRating' ]
            ]
        });
        const avg = average[0].dataValues.AvgRating;
        res.status(200).send(avg);
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

// Post a feedback
router.post('/feedback', passport.authenticate('jwt', { session: false }), isStudent,
  async (req, res, next) => {
    const { userId, lectureRating, lectureComment, instructorRating, instructorComment, lectureId } = req.body;
    try {
        console.log("ENTRE");
        const prevFeedback = await Feedback.findOne({where: { userId, lectureId}})
        if(!prevFeedback) {
            const feedback = await Feedback.create({
                id: uuidv4(),
                lectureRating, 
                lectureComment,
                instructorRating, 
                instructorComment
            });
            const lecture = await Lecture.findByPk(lectureId);
            const user = await User.findByPk(userId);
            lecture.addFeedback(feedback);
            user.addFeedback(feedback);
            res.send(feedback);
        } else {
            res.json({message: "Ya has escrito un feedback de esta clase."})
        }
    } catch (err) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(err);
    };
});

// Delete feedback
router.delete('feedback/:feedbackId', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
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
