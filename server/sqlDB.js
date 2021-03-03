require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);


const modelDefiners = [];

// Read all the model folder files, require and add them to the model definers array
fs.readdirSync(path.join(__dirname, '/modelsSQL'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/modelsSQL', file)));
  });

// Inject the connection to all models
modelDefiners.forEach(model => model(sequelize));
// Capitalize the model names
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructure the models to be used
const { Lecture, Feedback, User, Cohort, File, LectureFile, Role, Group } = sequelize.models;

Lecture.hasMany(Feedback);
Feedback.belongsTo(Lecture); // Adds lectureId column to Feedback table

User.hasMany(Feedback);
Feedback.belongsTo(User); // Adds userId column to Feedback table

User.belongsToMany(Cohort, { through: "userCohort" });
Cohort.belongsToMany(User, { through: "userCohort" }); // Creates UserCohort table

User.belongsToMany(Group, { through: "userGroup" });
Group.belongsToMany(User, { through: "userGroup" }); // Creates UserGroup table

User.belongsToMany(Role, { as: 'roles', through: 'userRoles' });
Role.belongsToMany(User, { as: 'users', through: 'userRoles' });

Cohort.hasMany(Lecture)
Lecture.belongsTo(Cohort)

Lecture.belongsToMany(File, { through: LectureFile });
File.belongsToMany(Lecture, { through: LectureFile }); // Creates LectureFile table

Cohort.hasMany(Group);
Group.belongsTo(Cohort);

File.hasMany(User)
User.belongsTo(File)


module.exports = { ...sequelize.models, conn: sequelize}
