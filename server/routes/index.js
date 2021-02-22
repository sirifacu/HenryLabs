const { Router } = require('express');
const test = require('./test');
const cohort = require('./cohort')

const router = Router();

router.use('/test', test);
router.use('/cohort', cohort)

module.exports = router
