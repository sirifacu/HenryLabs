const { STRING } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cohort', {
    mongoId: {
      type: STRING,
      primaryKey: true
    }
  });
};