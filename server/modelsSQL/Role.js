const { ENUM, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('role', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name:{
      type: ENUM('Student', 'Staff', 'Pm', 'Instructor'),
      allowNull: false
    },
  });
};
