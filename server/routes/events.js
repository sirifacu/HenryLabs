const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const passport = require('passport')
const { staffAndInstructor } = require("./helpers/authRoles");
const Events = require('../modelsMongoDB/Events')

router.get('/listAll', passport.authenticate('jwt', { session: false }), (req, res) => {
    Events.find()
    .then(response => res.send(response))
    .catch(error => res.status(402).send(error))
})

router.post('/post', passport.authenticate('jwt', { session: false }), staffAndInstructor, (req, res) => {
  
        const { title , description, start, end } = req.body
        Events.create({
          title: title,
          description: description,
          start: start,
          end:end
        })
        .then(response => {
          res.send(response)
        })
        .catch(error => {
           console.log(error)
           res.status(400).send(error.message)
        })

})

router.put('/editEvent/:id', passport.authenticate('jwt', { session: false }), staffAndInstructor, async(req, res) => {

    const { id } = req.params
    await Events.updateOne({"_id": ObjectId(id)},  req.body)
    Events.findById(id)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(error.message)
    })
})

router.delete('/deleteEvent/:id', passport.authenticate('jwt', { session: false }), staffAndInstructor, async (req, res, next) => {
    try {
        const { id } = req.params
        const event = await Events.deleteOne({"_id": ObjectId(id)})
        res.json(event)
      } catch (e) {
        res.status(500).send({
          message: 'error'
        });
        next(e);
      }
})

module.exports = router 
