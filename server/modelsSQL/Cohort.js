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
    },
    instructor_name: {
      type: STRING,
      required: true
    },
    instructor_id: {
      type: Sequelize.UUID,
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
