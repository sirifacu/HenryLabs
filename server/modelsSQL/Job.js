const { ENUM, STRING, INTEGER, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

  const Job = sequelize.define('job' , {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    title: {
      type: STRING,

    },
    type:{
      type: STRING,

    },
    contract:{
      type: STRING,

    },
    webProfile: {
      type: STRING,

    },
    description: {
      type: STRING(10000),

    },
    requirements: {
      type: STRING(10000),

    },
    benefits: {
      type: STRING(10000),

    },
    salary: {
      type: STRING,

    },
    language: {
      type: STRING,

    },
    seniority: {
      type: STRING,

    },
    others: {
      type: STRING(10000),

    },
    applyType: {
      type: STRING(100),

    },
    state: {
      type: ENUM({
        values: ['Open', 'Closed'],
      }),
      defaultValue: 'Open'
    },
  })
  return Job;
}