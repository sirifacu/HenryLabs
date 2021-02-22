const { STRING } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('role', {
    name:{
      type: STRING,
      allowNull: false
    },
    
  });
};
