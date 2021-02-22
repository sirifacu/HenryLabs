const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('testsql', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};