const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/');
const cors = require('cors');
const { conn } = require('./sqlDB');
const mongoose = require('mongoose');
const companion = require('@uppy/companion')

const app = express();

const {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_REGION} = process.env;

// Connect to database
/* mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/horaceDB';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err)); */

app.set('port', process.env.PORT || 3005);
console.log(__dirname)

// Middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.json());
/* app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, PUT")
    next()
});  */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    )
    next()
  })

const options = {
    providerOptions: {
        s3: {
            getKey: (req, filename, metadata) => filename,
            key: AWS_ACCESS_KEY,
            secret: AWS_SECRET_KEY,
            bucket: AWS_BUCKET_NAME,
            region: AWS_REGION,
            useAccelerateEndpoint: false, // default: false,
            expires: 3600, // default: 300 (5 minutes)
            acl: "public-read" // default: public-read
        }
    },
    server: {
      host: 'localhost:3005',
      protocol: 'http',
    },
    filePath: `${__dirname}/temp`,
    sendSelfEndpoint: "localhost:3005",
    secret: 'mysecret',
    uploadUrls: ['https://myuploadurl.com', 'http://localhost:3000'],
    debug: true
  }
  
app.use(companion.app(options))

// Routes
app.use('/api', routes);

// Port
conn.sync({ force: true }).then(() => {
    app.listen(app.get('port'), () => {
        console.log('PostgresDB connected')
        console.log('Server on port ' + app.get('port')); // eslint-disable-line no-console
    });
});

companion.socket(app, options)
