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
      type: STRING,

    },
    requirements: {
      type: STRING,

    },
    benefits: {
      type: STRING,

    },
    salary: {
      type: INTEGER,

    },
    others: {
      type: STRING,

    },
  })
  return Jobs;
}