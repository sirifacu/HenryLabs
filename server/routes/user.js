const express = require('express');
const router = express.Router();
const { User, Role } = require('../sqlDB')
const nodemailer = require('nodemailer');

// List all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        res.status(500).send({
            message: 'Users not found'
        })
        next(e);
    }
})

// List all users that are instructors
router.get('/instructors', async(req, res, next) => {
    try {
        const users = await User.findAll({
            where: { role: 'Instructor' }
        })
        res.json(users);
    } catch (e) {
        res.status(500).send({
            message: 'Users not found'
        })
        next(e)
    }
})

// Create user
router.post('/' , (req, res, next) => {
  console.log('crear usuario', req.body)
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
          roles && Promise.all(roles).then(roles => {
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

// Invite Email User
router.post('/invite', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
      const transporter = nodemailer.createTransport({
          host: "c2110783.ferozo.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
          user: 'shop@henryshop.ml', // generated ethereal user
          pass: 'RUq*bn/0fY', // generated ethereal password
          },   
      })
      const link = '/'
      const mailOptions = {
          from: 'shop@henryshop.ml',
          to: req.body.email,
          subject: 'Bienvenid@ a soyHenry!',
          html: `Hola ${req.body.firstName} ${req.body.lastName}<br>
          <a href=${link}> Ingresa aca para acceder a tu cuenta </a><br>
          Tu usuario es ${req.body.email} y tu contraseña por defecto es tu numero de DNI<br>
          Una vez que ingreses deberas completar los datos de tu perfil y cambiar la contraseña<br>`
      }
      transporter.sendMail(mailOptions, (err, success) => {
          if (err) {
                res.status(400).json({
                err: "ERROR SENDING EMAIL",
          })} 
      })
    })             
    res.json({message: "Check email inbox"})
})

module.exports = router;
