const router = require('express').Router();
const test = require('./test.js');

router.use('/test', test);

module.exports = router;
