const express = require("express");
const router = express.Router();
const { User, Role } = require('../sqlDB')

//Route to create User
router.post('/' , (req, res, next) => {
  let { firstName, lastName, email, password, dateOfBirth, roles } = req.body;
  
  User.findOne({
    where:{
      email: email
    }
  }).then(user =>{
      if(!user){
        User.create({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth
        }).then(user => {
          Promise.all(roles).then(roles => {
            user.addRoles(roles).then(() => {
              User.findOne({
                where: {
                  email: email
                },
                attributes: {
                  include: ['firstName', 'lastName', 'id'],
                  exclude: ['password']
                },
                include:{
                  model: Role,
                  as: 'roles',
                }
              }).then(user => {
                res.json(user)
              })
            });
          })
        })
        .catch(error => res.status(400).json(error))
      }
        res.json({message: 'El usuario ya existe'})
  }).catch(error => res.status(400).json(error))
});

module.exports = router;
