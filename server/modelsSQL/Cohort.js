const { ENUM, DATE, INTEGER, STRING } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cohort', {
    title: {
      type: STRING
    },
    number: {
      type: INTEGER
    },
    InitialDate: {
      type: DATE
    },
    state: {
      type: ENUM({
        values: ['created', 'active', 'finished']
      })
    },
  });
};