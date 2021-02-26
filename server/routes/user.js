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

// user search
router.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await User.findByPk(id);  
    res.json(user);
    console.log('AQUI USER: ', user)
  } catch (err) {
      res.status(400).send({
          message: 'Username does not exist'
      })
      next(err);
  }
})

// List all students
router.get('/students', async(req, res, next) => {
  try {
      const users = await Role.findAll({
          where: { name: 'students' },
          include: [
            { 
              model: User, 
              as: 'users'
            }
          ]
      })
      res.json(users);
  } catch (e) {
      res.status(500).send({
          message: 'Users not found'
      })
      next(e)
  }
})

// List all PM's
router.get('/pm', async(req, res, next) => {
  try {
      const users = await Role.findAll({
          where: { name: 'pm' },
          include: [
            { 
              model: User, 
              as: 'users'
            }
          ]
      })
      res.json(users);
  } catch (e) {
      res.status(500).send({
          message: 'Users not found'
      })
      next(e)
  }
})
// List all users that are instructors
router.get('/instructors', async(req, res, next) => {
    try {
        const users = await Role.findAll({
            where: { name: 'Instructor' },
            include: [
              { 
                model: User, 
                as: 'users'
              }
            ]
        })
        res.json(users);
    } catch (e) {
        res.status(500).send({
            message: 'Users not found'
        })
        next(e)
    }
})

// Get user's checkpoints marks
router.get('/checkpoints/:userId', async (req,res) => {
    try{
        const {userId} = req.params;
        const checkPoints = await Feedback.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: User,
                    attributes: ['checkpoint1', 'checkpoint2','checkpoint3', 'checkpoint4']
                }
            ]
        });
        res.json(checkPoints)
    }
    catch (e) {
        res.status(500).send({
            message: "There is a error"
        })
    }
})

// Create user
router.post('/createUser' , (req, res, next) => {
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
          const promises = roles && roles.map(rol => {
            new Promise (async (resolve, reject) => {
              const role = await Role.create({name: rol})
              resolve( user.addRole(role) )
            })
          })
          Promise.all(promises || [])
          .then(res.json(user))
        })
      } 
      else {
        res.json({message: 'El usuario ya existe'})
      }
  }).catch(error => res.status(400).json(error))
});

// Create role
router.post('/role', async (req, res, next) => {
  try {
    const { name } = req.body;
    const role = await Role.create( { name } );
    res.json(role)
} catch (e) {
    res.status(500).send({
        message: 'There has been an error'
    });
    next(e);
  };
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

// Change checkpoint status
router.put('/checkpoint/status/:num/:userId', (req, res, next) => {
    try {
        const { status } = req.body;
        const { num, userId } = req.params;
        const user = User.findByPk(userId);
        user['checkpoint'+num] = status;
        user.save();
        res.json({message: "La nota del checkpoint ha sido actualizada."})
    } catch {
        res.send({
            message: "An error has ocurred while creating new user"
        });
    };
});

module.exports = router;
