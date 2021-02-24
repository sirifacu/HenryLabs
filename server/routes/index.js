const { Router } = require('express');
const lecture = require('./lecture');
const feedback = require('./feedback');
const user = require('./user');
const cohort = require('./cohort')

const router = Router();

// Write the model name in plural
router.use('/lectures', lecture);
router.use('/feedbacks', feedback);
router.use('/users', user);
router.use('/cohort', cohort);

module.exports = router
