const express = require('express');
const router = express.Router();
const { Jobs } = require('../sqlDB')
const { v4: uuidv4 } = require('uuid');

// Create Jobs 

router.post('/job' , (req, res, next) => {
  let {title, type, contract, webProfile, description, requirements, benefits, salary, others} = req.body;
  Jobs.create({
    id: uuidv4(),
    title, 
    type, 
    contract, 
    webProfile, 
    description, 
    requirements, 
    benefits, 
    salary, 
    others
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  })

  //list jobs
  router.get("/getjobs", async (req, res, next) => {
    try {
      const jobs = await Jobs.findAll();
      res.json(jobs);
    } catch (e) {
      res.status(500).send({
        message: "There has been an error",
      });
      next(e);
    }
  });
    
  module.exports = router;