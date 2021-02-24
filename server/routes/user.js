const express = require("express");
const router = express.Router();
const { User, Role } = require('../sqlDB')

//Route to create User
router.post('/' , (req, res, next) => {
  let { firstName, lastName, email, password, roles } = req.body;
  
  roles = roles.map(role => {
    return  Role.findByPk(role)
  })
  
  User.findOne({
    where:{
      email: email
    }
  })
    .then(user =>{
      if(!user){
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
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
        .catch(err => res.status(400).json(err))
      }
  }).catch(err => next(err))
});

module.exports = router;
