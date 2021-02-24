const express = require("express");
const router = express.Router();
const { Role } = require('../modelsSQL/Role')


router.post('/role' , (req, res) => {
  let { name } = req.body;
  Role.findOrCreate({
    where: {
      name: name,
    }
  }).then(role => {
    res.status(201).json(role);
  })
    .catch(err => {
      res.status(400).send(err)
    })
});

module.exports = router;



