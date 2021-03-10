const express = require('express');
const passport = require('passport')
const { isStaff, isInstructor, staffAndInstructor } = require("./helpers/authRoles");
const router = express.Router();
const { User, Role, Cohort, File } = require('../sqlDB')
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize')

// List all users
router.get('/listAll', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { role } = req.query
      if(role){
        const users = await User.findAll({
            include: [
              {
                model: Role,
                as: 'roles',
                where: { name: role },
              },
              {
                model: Cohort,
                attributes: ['id', 'number']
              }
            ]
        })
        res.json(users);
      } else {
        const users = await User.findAll();
        res.json(users);
      }
    } catch (e) {
        res.status(500).send({
            message: 'Users not found'
        })
        next(e);
    }
});

// Get users by different parametres

router.get('/listUsersBy', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  async (req, res, next) => {
  try {
    const { name, cohortNumber, email, migrationsQuantity } = req.query;
    var options = {where: {}, include: []};
    if(name){
      if(name.includes('-')){
        let firstName = name.split('-')[0];
        let lastName = name.split('-')[1];
        options.where = {
          ...options.where,
          firstName: {[Sequelize.Op.iLike]: `%${firstName}%`},
          lastName: {[Sequelize.Op.iLike]: `%${lastName}%`}
        };
      }
      else{
        options.where.firstName = {[Sequelize.Op.iLike]: `%${name}%`}
      };
    };
    if(cohortNumber) options.include.push({model: Cohort, where: {number: parseInt(cohortNumber)}});
    if(email) options.where.email = {[Sequelize.Op.iLike]: `%${email}%`};
    if(migrationsQuantity) options.where.migrationsQuantity = parseInt(migrationsQuantity);
    if (!cohortNumber) options.include.push({model: Cohort, attributes: ['id', 'number']});
    options.include.push({ model: Role, as: 'roles', where: { name: 'student' } });
    const users = await User.findAll(options);
    res.json(users);
  } catch (e) {
    res.status(500).json({message: 'There has been an error.'});
    next(e);
  };
});

//Get students by cohort Id
router.get('/listUsers/cohort/:cohortId', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {cohortId} = req.params;
      const { name, github, email, migrationsQuantity } = req.query;
      var options = {where: {}, include: []};
      if(name){
        if(name.includes('-')){
          let firstName = name.split('-')[0];
          let lastName = name.split('-')[1];
          options.where = {
            ...options.where,
            firstName: {[Sequelize.Op.iLike]: `%${firstName}%`},
            lastName: {[Sequelize.Op.iLike]: `%${lastName}%`}
          };
        }
        else{
          options.where.firstName = {[Sequelize.Op.iLike]: `%${name}%`}
        };
      };
      if(github) options.where.githubUser = {[Sequelize.Op.iLike]: `%${github}%`};
      if(email) options.where.email = {[Sequelize.Op.iLike]: `%${email}%`};
      if(migrationsQuantity) options.where.migrationsQuantity = parseInt(migrationsQuantity);
  /*     if (!cohortNumber) options.include.push({model: Cohort, attributes: ['id', 'number']}); */
      options.include.push({ model: Role, as: 'roles', where: { name: 'student' } });
      options.include.push({ model: Cohort, where: { id: cohortId } });
      const users = await User.findAll(options);
      res.json(users);
    } catch (e) {
      res.status(500).json({message: 'There has been an error.'});
      next(e);
    };
});

// Get user's checkpoints marks
router.get('/checkpoints/:userId', passport.authenticate('jwt', { session: false }),
  async (req,res) => {
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

// user search
router.get('/:id', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.json(user);
    } catch (err) {
        res.status(400).send({
            message: 'Username does not exist'
        })
        next(err);
    }
})

router.get('/:code/email/:email', (req, res) => {
  const date = Date.now()
  let { code, email } = req.params
  User.findOne({where:{email: email}})
  .then( user => {
      const exp = Date.parse(user.passwordResetExpires)
      code = parseInt(code, 10)
      if(code !== user.recoveryToken){
         return res.status(404).send({msg: "el codigo es incorrecto"})
      }
      if(code === user.recoveryToken && exp < date){
         return res.status(400).send({msg: "el codigo a expirado"})
      }
      return res.status(200).send({msg: "el codigo es correcto"})
  })
  .catch( error => {
      res.status(400).send({error, msg: error.message})
  })
})

// Create user
router.post('/createUser', passport.authenticate('jwt', { session: false }), isStaff,
  (req, res) => {
    let { firstName, lastName, email, cellphone, password, roles, completeProfile } = req.body;
    User.findOne({
      where:{
        email: email
      }
    }).then(user =>{
        if(!user){
          User.create({
              id: uuidv4(),
              firstName,
              lastName,
              email,
              cellphone,
              password,
              completeProfile: 'pending'
          }).then(user => {
            const promises = roles?.map(item => {
              new Promise (async (resolve, reject) => {
                const role = await Role.findOne({where: {name: item}})
                if(!role){
                  const newRole = await Role.create({id: uuidv4(), name: item})
                  resolve( user.addRole(newRole) )
                } else {
                  resolve(user.addRole(role))
                }
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
router.post('/role', passport.authenticate('jwt', { session: false }), isStaff,
  async (req, res, next) => {
  try {
    const { name } = req.body;
    const role = await Role.create( { id: uuidv4(), name } );
    res.json(role)
} catch (e) {
    res.status(500).send({
        message: 'There has been an error'
    });
    next(e);
  }
});

// Invite Email User
router.post('/invite', passport.authenticate('jwt', { session: false }), staffAndInstructor,
  (req, res) => {
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
      const link = 'http://localhost:3000/'
      const mailOptions = {
          from: 'shop@henryshop.ml',
          to: req.body.email,
          subject: 'Bienvenid@ a soyHenry!',
          html: `Hola ${req.body.firstName} ${req.body.lastName}<br>
          <a href=${link}> Ingresa aca para acceder a tu cuenta </a><br>
          Tu usuario es ${req.body.email} y tu contraseña por defecto es tu numero de DNI<br>
          Una vez que ingreses deberás completar los datos de tu perfil y cambiar la contraseña<br>`
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

router.post('/sendVerifyCode', async (req, res) => {

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }
  const verifyCode = Math.round(getRandomArbitrary(100000,999999))
  const user = await User.findOne({where:{email: req.body.email}})
  if(!user){
    res.status(404).json({msg: "Este email no se encuentra registrado"})
  }else{
    const transporter = nodemailer.createTransport({
      host: "c2110783.ferozo.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
      user: 'shop@henryshop.ml', // generated ethereal user
      pass: 'RUq*bn/0fY', // generated ethereal password
      },
    })
    const mailOptions = {
      from: 'shop@henryshop.ml',
      to: req.body.email,
      subject: 'Este es tu codigo de verificacion!',
      html: `
      Hola tu codigo para recuprar tu contraseña es <br>
      <h3>${verifyCode}</h3><br>
      Recuerda que este tiene una duracion de solo 30 minutos`
    }
    transporter.sendMail(mailOptions, (err, success) => {
      if (err) {
          res.status(400).json({
          err: "ERROR SENDING EMAIL",
      })}
    })
    user.recoveryToken = verifyCode
    user.passwordResetExpires = new Date().setMinutes(new Date().getMinutes()+ 30)
    await user.save()
    .then(response =>{
        res.send({msg: "codigo enviado"})
    })
    .catch(error =>{
        console.log(error)
        res.json({
            error:error.message,
        })
    })
  }
})

// Change checkpoint status
router.post('/checkpoint/status/:checkpoint', passport.authenticate('jwt', { session: false }), isInstructor,
  (req, res, next) => {
    try {
        const { students, cohortId } = req.body;
        const { checkpoint } = req.params;
        let promises = students.length ? students.map( student => {
            return new Promise( (resolve, reject) => {
              resolve(
                User.findOne({where: {githubUser: student}})
                  .then(async user => {
                    if (user) {
                      user[checkpoint] = 'passed'
                      await user.save()
                    }
                  })
              );
            });
          })
        : [];

        Promise.all(promises)
        .then(async ()  => {
          const users = await User.findAll({
            where: {
              [checkpoint]: {
                [Sequelize.Op.eq]: null
              }
            },
            include: [{model: Cohort, where: {id: cohortId }}]
          })

          let promisesFailed = users ? users.map(user => {
            new Promise( (resolve, reject) => {
              user[checkpoint] = 'failed';
              user.save();
            });
          })
          : [];

          Promise.all(promisesFailed)
          .then(() => res.json({ message: 'Notas actualizadas' }))
        });
    } catch {
        res.send({
            message: "An error has occurred while creating new user"
        });
    }
});

// Update user
router.put('/resetPassword', (req, res) => {
  const { password, email} = req.body
  User.update({
    password
  },{ where: {email: email}, individualHooks: true
})
  .then(user => {
    res.json({user, msg: "contraseña cambiada con exito"})
  })
  .catch(error => {
  res.status(400).json({error, msg: error.message})
  })
})

router.put('/update/:userId', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { userId } = req.params;
    const { email, address, city, state, country, cellphone, avatar } = req.body;
    
    User.update({
      email,
      address,
      city,
      state,
      country,
      cellphone,
      avatar
    }, { where: {id: userId}
    })
      .then(() => {
        User.findByPk(userId).then(user => {
        res.status(200).json({user})})
      })
      .catch(error => {
        res.status(400).send({
          error: error,
          message: 'There has been an error'
        })
      })
});

router.put('/completeProfile/:userId', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { userId } = req.params;
    const { dateOfBirth, address, city,
      state, country, nationality, cellphone, githubUser, googleUser, linkedinUser,password, avatar} = req.body;
      
    const userGithub = await User.findOne({where: {githubUser: githubUser}})
    const userGoogle = await User.findOne({where: {googleUser: googleUser}})
    const userLinkedin = await User.findOne({where: {linkedinUser: linkedinUser}})
  
    if(userGithub){
      return res.status(402).json({message: "Este usuario de Github ya esta registrado", status: "error"})
    }
    
    if(userGoogle){
      return res.status(402).json({message: "Este correo de google ya esta registrado", status: "error"})
  }

  if(userLinkedin){
    return res.status(402).json({message: "Este usuario de linkedinya esta registrado", status: "error"})
    }
    
    else{
    
    User.update({
      city,
      state,
      avatar,
      address,
      country,
      nationality,
      cellphone,
      githubUser,
      googleUser,linkedinUser,
      password,
      dateOfBirth,
      completeProfile: "done"
    }, { where: {id: userId}, individualHooks: true
    })
      .then(() => {
        User.findByPk(userId).then(user => {
        res.status(200).json({user, message: "Datos actualizados correctamente", status: "success"})})
      })
      .catch(error => {
        res.status(400).send({
          error: error.message,
          message: 'There has been an error'
        })
      })}
});

// Get cohort and instructor of a specific user
router.get("/infoCohort/:userId", passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { userId } = req.params
     User.findOne({
       where: {
         id: userId,
       },
       include: [
         {
           model: Cohort,
           attributes: ['id', 'title','number', 'instructor_name'],
         },
       ]
     }).then(panelUserInfo => {
       if(panelUserInfo.cohorts.length){
         res.json(panelUserInfo)
       } else {
         res.json({message: "No estás asociado a ningún cohorte."})
       }
     }).catch(error => {
       next(error)
     })
})


// Review user's registration token
router.post('/:userId/:registrationToken', async (req, res, next) => {
  try {
    const { userId, registrationToken } = req.params;
    const user = await User.findByPk(userId);
    if(userId && registrationToken){
      if(user.registrationToken !== registrationToken){
        user.registrationToken = registrationToken;
        user.save();
        res.status(201).json({message: "The registration token has been updated."})
      } else {
        res.status(304).json({message: "The registration token hasn't been modified."})
      }
    } else {
      res.status(422).json({message: "The user id or the registration token was not provided."})
    }
  } catch (e) {
    res.status(500).json({message: "There has been an error."});
    next(e);
  };
})

module.exports = router;
