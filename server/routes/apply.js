const express = require('express');
const router = express.Router();
const { Apply, User} = require('../sqlDB')
const { v4: uuidv4 } = require('uuid');

  //apply job
  router.post('/post' , (req, res, next) => {
    let {jobId, userId, english, webProfile, others} = req.body
    Apply.create({
      id: uuidv4(),
      jobId,
      userId,
      english,
      webProfile,
      others
    }).then((response) => {
      res.status(200).send(response);
    })
    .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  })

  router.get("/list/:jobId", (req, res, next) => {
    const {jobId} = req.params;
    Apply.findAll({
      where: { jobId: jobId },
      include: [{ model: User }],
    }).then((response) => {
      res.status(200).send(response);
    })
    .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  })

  module.exports = router;