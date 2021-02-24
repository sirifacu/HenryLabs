const express = require("express");
const router = express.Router();
const { User } = require('../sqlDB')


router.post('/', async (req, res) => {
  try {
    console.log(req.body)
      const { firstName, lastName, email, password } = req.body;
      const user = await User.create({
          firstName, lastName, email, password
      });
      user.save();

      res.send(user);
  } catch {
      res.send({
          message: "An error has ocurred while creating new user"
      });
  };
});

module.exports = router;