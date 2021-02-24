const express = require('express');
const { File, Lecture } = require('../sqlDB.js');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create a file and associate it to the class
router.post('/add/:lectureId', async (req, res, next) => {
    try {
        const { lectureId } = req.params;
        const { name, extension, url } = req.body;
        const prevFile = File.findOne({where: {url}});
        const lecture = Lecture.findByPk(lectureId);
        if(!prevFile){
            // Create file and associate it to the class
            const file = await File.create({ id: uuidv4() , name, extension, url});
            lecture.addFiles(file);
            res.json(file);
        } else {
            // Associate the prevFile to the new class\
            lecture.addFiles(prevFile)
        }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

// Remove relation between a file and a lecture
router.put('/remove/:lectureId/file/:fileId', async (req, res, next) => {
    try {
        const { lectureId, fileId } = req.params;
        const lecture = Lecture.findByPk(lectureId);
        const file = File.findByPk(fileId);
        Lecture.removeFiles(file);
        res.json({message: "El archivo fue removido de la clase."})
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    };
});

module.exports = router;