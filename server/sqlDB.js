require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/horace`, {
  logging: false,
  native: false,
});

// const basename = path.basename('./');
const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the model folder files, require and add them to the model definers array
fs.readdirSync(path.join(__dirname, '/sqlModels'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/sqlModels', file)));
  });

// Inject the connection to all models 
modelDefiners.forEach(model => model(sequelize));
// Capitalize the model names
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructure the models to be used
// const {  } = sequelize.models;


module.exports = { ...sequelize.models, conn: sequelize}
