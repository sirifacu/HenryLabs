const { Router } = require('express');
const test = require('./test');
const cohort = require('./cohort')
const user = require('./user')

const router = Router();

router.use('/', test);
router.use('/cohort', cohort)
router.use('/user', user)

module.exports = router
