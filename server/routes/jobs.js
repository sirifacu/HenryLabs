const express = require('express');
const passport = require('passport')
const { isStaff, isInstructor, isStudent } = require("./helpers/authRoles");
const router = express.Router();
const { Job } = require('../sqlDB')
const { v4: uuidv4 } = require('uuid');

// Create Jobs 
router.post('/post', passport.authenticate('jwt', { session: false }) , isStaff, (req, res, next) => {
  let {title, type, contract, webProfile, description, requirements, benefits, salary, others, language, seniority, applyType} = req.body;
  Job.create({
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
  router.get("/list", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
      const jobs = await Job.findAll();
      res.json(jobs);
    } catch (e) {
      res.status(500).send({
        message: "There has been an error",
      });
      next(e);
    }
  });


  //get one job
  router.get('/list/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
      const {id} = req.params
      const job = await Job.findByPk(id)
      res.json(job)
    } catch (e) {
      res.status(500).send({
        message: 'error'
      });
      next(e);
    }
  })


  //delete job
  router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), isStaff, async (req, res, next) => {
    try{
      const {id} = req.params
      const deletedJob = await Job.findByPk(id)
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
