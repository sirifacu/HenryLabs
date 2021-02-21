const { Router } = require('express');
const test = require('./test');

router.use('/test', test);

router.use('/test', test)

module.exports = router
