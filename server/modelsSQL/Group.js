const { NUMBER, STRING, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('group', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    number:{
      type: NUMBER,
      allowNull: false
    },
    pm1: {
      type: STRING,
      allowNull: false,
    },
    pm2: {
      type: STRING,
      allowNull: false,
    }
  });
};
