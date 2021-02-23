const express = require('express');
const { User } = require('../sqlDB.js')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create User
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, email, password } = req.body;
        const user = await User.create({
            id: uuidv4(), firstName, lastName, dateOfBirth, email, password
        });
        user.save();

        res.send(user);
    } catch {
        res.send({
            message: "An error has ocurred while creating new user"
        });
    };
});

// Get user's checkpoints marks
router.get('/checkpoints/:userId', async (req,res) => {
    try{
        const {userId} = req.params;
        const checkPoints = await Feedback.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: User,
                    attributes: ['checkpoint1', 'checkpoint2','checkpoint3', 'checkpoint4']
                }
            ]
        });
        res.json(checkPoints)
    }
    catch (e) {
        res.status(500).send({
            message: "There is a error"
        })
    }
})

// Change checkpoint status
router.put('/checkpoint/status/:num/:userId', (req, res, next) => {
    try {
        const { status } = req.body;
        const { num, userId } = req.params;
        const user = User.findByPk(userId);
        user['checkpoint'+num] = status;
        user.save();
        res.json({message: "La nota del checkpoint ha sido actualizada."})
    } catch {
        res.send({
            message: "An error has ocurred while creating new user"
        });
    };
});

module.exports = router;
