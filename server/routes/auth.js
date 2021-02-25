const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require ('jsonwebtoken')
require('dotenv').config();
const { SECRET } = process.env;

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, message) => {
      const { id, firstName, lastName, email, roles } = user;
          if(user) {
            const token = jwt.sign( { id, firstName, lastName, email, roles  }, SECRET)
              res.status(200).json(token)
          }else{
            res.status(402).json({ err, message })
          }
      })
      (req, res, next)
  })

module.exports = router;
