const { Router } = require('express');
const cohort = require('./cohort')
const user = require('./user')
const auth = require('./auth')

const router = Router();

router.use('/cohort', cohort)
router.use('/user', user)
router.use('/auth', auth);

module.exports = router
