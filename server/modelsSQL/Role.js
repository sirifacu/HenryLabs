const { ENUM } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('role', {
    name:{
      type: ENUM('Student', 'Staff', 'Pm', 'Instructor'),
      allowNull: false
    },
  });
};
