const express = require('express');
const { User } = require('../sqlDB.js');
const router = express.Router();

router.post('/', (req, res) => {
    User.create(req.body)
    .then(user => {
        return res.status(200).send(user)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        res.status(500).send({
            message: 'Users not found'
        })
        next(e);
    }
})

module.exports = router;