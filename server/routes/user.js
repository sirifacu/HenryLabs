const express = require("express");
const router = express.Router();
const { User } = require('../sqlDB')
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
      const { firstName, lastName, email, password } = req.body;
      const user = await User.create({
          firstName, lastName, email, password
      });
      res.send(user);
  } catch {
      res.send({
          message: "An error has ocurred while creating new user"
      });
  };
});

//Invite Email User
//recibe por body (firstName, lastName, email)
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