const { STRING, INTEGER, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

  const Jobs = sequelize.define('jobs' , {
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
    others: {
      type: STRING(10000),

    },
  })
  return Jobs;
}