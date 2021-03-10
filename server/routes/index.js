const { Router } = require('express');
const lecture = require('./lecture');
const feedback = require('./feedback');
const user = require('./user');
const cohort = require('./cohort');
const file = require('./file')
const auth = require('./auth')
const group = require('./group')
const jobs = require('./jobs')
const news = require('./news')
const apply = require('./apply')
const booms = require("./booms");

const router = Router();

// Write the model name in plural
router.use('/lectures', lecture);
router.use('/feedbacks', feedback);
router.use('/users', user);
router.use('/cohorts', cohort);
router.use('/files', file);
router.use('/auth', auth);
router.use('/jobs', jobs)
router.use('/apply', apply)
router.use('/groups', group)
router.use('/createjobs', jobs)
router.use('/news', news)
router.use("/booms", booms);

module.exports = router
