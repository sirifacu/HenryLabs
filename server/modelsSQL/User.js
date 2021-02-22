const { STRING, INTEGER, DATEONLY, ENUM, BOOLEAN, DATE } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('user', {
    first_name:{
      type: STRING,
      allowNull: false
    },
    last_name:{
      type: STRING,
      allowNull: false
    },
    date_of_birth:{
      type: DATEONLY
    },
    email:{
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    address:{
      type: STRING
    },
    city:{
      type: STRING
    },
    state:{
      type: STRING
    },
    country:{
      type: STRING,
      allowNull: false
    },
    nationality:{
      type: STRING
    },
    avatar:{
      type: STRING(3000),
    },
    description:{
      type: STRING(500)
    },
    password:{
      type: STRING,
      allowNull: false,
    },
    modality: {
      type: STRING
    },
    cellphone: {
      type: INTEGER
    },
    recovery_token: {
      type: INTEGER
    },
    password_reset_expires: {
      type: DATE
    },
    reset_password:{
      type: BOOLEAN
    },
    github_user:{
      type: STRING,
      unique: true,
    },
    google_user:{
      type: STRING,
      unique: true,
    },
    codewars_rank: {
      type: INTEGER
    },
    codewars_points: {
      type: INTEGER
    },
    migrations_quantity: {
      type: INTEGER
    },
    checkpoint_1: {
      type: ENUM("passed", "failed")
    },
    checkpoint_2: {
      type: ENUM("passed", "failed")
    },
    checkpoint_3: {
      type: ENUM("passed", "failed")
    },
    checkpoint_4: {
      type: ENUM("passed", "failed")
    }
    
  });
};

