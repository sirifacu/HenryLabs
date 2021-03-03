const { ENUM, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('role', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name:{
      type: ENUM('student', 'staff', 'pm', 'instructor'),
      allowNull: false
    },
  });
};
