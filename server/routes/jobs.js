const express = require('express');
const router = express.Router();
const { Jobs } = require('../sqlDB')
const { v4: uuidv4 } = require('uuid');

// Create Jobs 
router.post('/post' , (req, res, next) => {
  let {title, type, contract, webProfile, description, requirements, benefits, salary, others, language, seniority, applyType} = req.body;
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
    others,
    seniority,
    language,
    applyType
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
  router.get("/list", async (req, res, next) => {
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


  //get one job
  router.get('/list/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const job = await Jobs.findByPk(id)
      res.json(job)
    } catch (e) {
      res.status(500).send({
        message: 'error'
      });
      next(e);
    }
  })


  //delete job
  router.delete('/delete/:id', async (req, res, next) => {
    try{
      const {id} = req.params
      const deletedJob = await Jobs.findByPk(id)
      const response = deletedJob
      deletedJob.destroy()
      res.json(response)
    }catch (e) {
      res.status(500).send({
        message: 'error'
      });
      next(e);
    }
  })


    
  module.exports = router;