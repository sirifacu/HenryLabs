const express = require('express');
const router = express.Router();
const News = require('../modelsMongoDB/News')


router.get('/news' , (req, res) => {
  News.find()
  .then(response => res.json(response))
})

router.post('/news' , (req, res) => {
  const {title} = req.body
  News.create({
    title: title
  })
  .then(response => res.json(response))
})


module.exports = router