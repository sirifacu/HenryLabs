const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/');
const cors = require('cors');
const { conn } = require('./sqlDB');
// const mongoose = require('mongoose');

const app = express();

// Connect to database
/* mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/horaceDB';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err)); */

app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Port
conn.sync({ force: true }).then(() => {
    app.listen(app.get('port'), () => {
        console.log('PostgresDB connected')
        console.log('Server on port ' + app.get('port')); // eslint-disable-line no-console
    });
});
