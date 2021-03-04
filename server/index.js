const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/');
const cors = require('cors');
const { conn, User, Role } = require('./sqlDB');
// const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const app = express();

// Connect to database
// mongoose.Promise = global.Promise;
// const dbUrl = 'mongodb://localhost:27017/horaceDB';
// mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
app.use(passport.initialize());
app.use(passport.session());

// passport
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({
      where: {
        email: email },
      include:{
        model: Role,
        as: 'roles',
      }
    })
    const validate = await user.matchPassword(password);

    if (!user || !validate) {
      return done(null, false, { message: 'Email o contraseña incorrectos' })
    }

    return done(null, user, { message: 'Login successful' })
  } catch (error) {
    return done(error, null, { message: 'Algo salió mal' });
  }
}))


// Routes
app.use('/api', routes);

// Port
conn.sync({ force: false }).then(() => {
    app.listen(app.get('port'), () => {
        console.log('PostgresDB connected')
        console.log('Server on port ' + app.get('port')); // eslint-disable-line no-console
    });
});
