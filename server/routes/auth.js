const express = require("express");
const server = express.Router();
const passport = require("passport");
const jwt = require ('jsonwebtoken')

server.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, message) => {
          if(user) {
            const token = jwt.sign( { user }, secret)
              res.status(200).json({ user, token })
          }else{
            res.status(402).json({ err, message })
          }
      }) 
      (req, res, next)
  })
