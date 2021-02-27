const { NUMBER, Sequelize } = require('sequelize');


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
  });
};
