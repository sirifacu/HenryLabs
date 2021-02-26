const { ENUM, DATE, INTEGER, STRING, NUMBER, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cohort', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
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
    instructor_name: {
      type: STRING,
      required: true
    },
    instructor_id: {
      type: INTEGER,
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
