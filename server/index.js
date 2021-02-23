const JWTStrategy = require('passport-jwt').Strategy,
      ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/');
const cors = require('cors');
const { conn, User } = require('./sqlDB');
const mongoose = require('mongoose');
const passport = require('passport');
const { SECRET } = process.env

const app = express();

// Connect to database
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/horaceDB';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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
passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, next) => {
        await User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user || !user.correctPassword(password)) {
              next(null, false, { message: "Correo o contraseña incorrectos" });
            } else { 
            next(null, user, { message: "Login Successfull" });
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    )
  );

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : SECRET
    },
    function (jwtPayload, next) {
        User.findByPk( jwtPayload.user.id )
        .then(user => {
            next(null, user.id);
        })
        .catch(err => {
            next(err);
        });
    }
))  



passport.serializeUser((user, next) => next(null, user));

passport.deserializeUser((user, next) => {
  next(null, user);
})

// Routes
app.use('/api', routes);

// Port
conn.sync({ force: true }).then(() => {
    app.listen(app.get('port'), () => {
        console.log('PostgresDB connected')
        console.log('Server on port ' + app.get('port')); // eslint-disable-line no-console
    });
});
