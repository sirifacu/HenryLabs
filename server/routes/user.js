const express = require("express");
const router = express.Router();
const { User } = require('../sqlDB')


router.post('/' , (req, res, next) => {
  let { firstName, lastName, email, password, country } = req.body;
  User.findOne({
    where:{
      email: email
    }
  }).then(user =>{
    if(!user){
      User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
      }).then(newUser => {
        res.status(201).json(newUser);
      })
        .catch(err => {
          res.status(400).send(err)
        })
    }
  }).catch(err => {
    next(err)
  })
});

module.exports = router;
