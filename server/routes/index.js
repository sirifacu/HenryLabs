const { Router } = require('express');
const lecture = require('./lecture');
const feedback = require('./feedback');
const user = require('./user');

const router = Router();

// Write the model name in plural
router.use('/lectures', lecture);
router.use('/feedbacks', feedback);
router.use('/users', user);

module.exports = router
