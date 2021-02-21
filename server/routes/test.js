const express = require('express');

const router = express.Router();

router.get('/test', (req, res, next) => {
    try {
       res.json({message: 'Test'});
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

module.exports = router
