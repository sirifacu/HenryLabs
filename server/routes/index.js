const { Router } = require('express');
const test = require('./test');

const router = Router()

router.use('/test', test)

module.exports = router