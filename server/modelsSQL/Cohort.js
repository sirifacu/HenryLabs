const { ENUM, DATE, INTEGER, STRING } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cohort', {
    title: {
      type: STRING,
      required: true
    },
    number: {
      type: INTEGER,
      required: true
    },
    initialDate: {
      type: DATE,
      required: true
    },
    state: {
      type: ENUM({
        values: ['Creado', 'Activo', 'Finalizado'],
      }),
      defaultValue: 'Creado'
    },
  });
};