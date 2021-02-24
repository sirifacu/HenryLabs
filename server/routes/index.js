const { Router } = require('express');
const test = require('./test');
const user = require('./user')
const auth = require('./auth')

const router = Router();

router.use('/test', test);
router.use('/user', user);
router.use('/auth', auth);

module.exports = router
