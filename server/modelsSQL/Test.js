const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('test', {
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