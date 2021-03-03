const express = require('express');
const { File, Lecture, LectureFile, User } = require('../sqlDB.js');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create a file and associate it to the class
router.post('/add/:lectureId', async (req, res, next) => {
    try {
        const { lectureId } = req.params;
        const { name, extension, url } = req.body;
        const prevFile = await File.findOne({where: { name, extension } });
        const lecture = await Lecture.findByPk(lectureId);

        if(!prevFile){
            // Create file and associate it to the class
            const fileId = uuidv4();
            const file = await File.create({ id: fileId , name, extension, url});
            lecture.addFiles(file, { through: { id: uuidv4() } });
            res.json(file);
        } else {
            // Associate the prevFile to the new class\
            lecture.addFile(prevFile, { through: { id: uuidv4() } });
            res.json(prevFile);
        }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

router.post('/addUserImage/:userId', async(req, res) => {
    try {
        const { userId } = req.params
        const { name, extension, url } = req.body;
        const file = await File.create({ id: uuidv4() , name, extension, url});
        const user = await User.findByPk(userId)

        await user.setFile(file)
        res.json(user)

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
})

// List all files that belongs to a class
router.get('/listAll/:lectureId', async (req, res, next) => {
    try {
        const { lectureId } = req.params
        const files = await Lecture.findAll({
            where: { id: lectureId },
            include: [{ model: File }]
        })
        res.json(files)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
})

// Remove relation between a file and a lecture
router.delete('/remove/:lectureId/file/:fileId', async (req, res, next) => {
    try {
        const { lectureId, fileId } = req.params;
        const lecture = await Lecture.findByPk(lectureId);
        const file = await File.findByPk(fileId);
        lecture.removeFile(file);
        res.json({message: "El archivo fue removido de la clase."})
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

module.exports = router;
