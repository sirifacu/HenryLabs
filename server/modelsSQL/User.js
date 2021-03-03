const { STRING, INTEGER, DATEONLY, ENUM, BOOLEAN, DATE, BIGINT, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
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
      type: BIGINT
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
    completeProfile:{
      type: ENUM("pending", "done"),
      defaultValue: 'pending'
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
  
  const encryptPassword = async function (user) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  };
  
  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);
  
  return User;
};

