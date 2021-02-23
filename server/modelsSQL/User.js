const { STRING, INTEGER, DATEONLY, ENUM, BOOLEAN, DATE } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('user', {
    firstName:{
      type: STRING,
      allowNull: false
    },
    lastName:{
      type: STRING,
      allowNull: false
    },
    dateOfBirth:{
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
    recoveryToken: {
      type: INTEGER
    },
    passwordResetExpires: {
      type: DATE
    },
    resetPassword:{
      type: BOOLEAN
    },
    githubUser:{
      type: STRING,
      unique: true,
    },
    googleUser:{
      type: STRING,
      unique: true,
    },
    codewarsRank: {
      type: INTEGER
    },
    codewarsPoints: {
      type: INTEGER
    },
    migrationsQuantity: {
      type: INTEGER
    },
    checkpoint1: {
      type: ENUM("passed", "failed")
    },
    checkpoint2: {
      type: ENUM("passed", "failed")
    },
    checkpoint3: {
      type: ENUM("passed", "failed")
    },
    checkpoint4: {
      type: ENUM("passed", "failed")
    }
    
  });
};

