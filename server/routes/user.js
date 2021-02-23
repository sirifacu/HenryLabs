const express = require('express');
const { User } = require('../sqlDB.js')
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const user = await User.findByPk({id}, {where: {role: user.rol}}) // 
        res.json(user);
    } catch (err) {
        res.status(400).send({
            message: 'Username does not exist'
        })
        next(err);
    }
})
