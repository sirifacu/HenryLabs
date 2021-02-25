const { INTEGER, STRING, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('lecture', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    title: {
        type: STRING,
        // allowNull: false
    },
    module: {
        type: INTEGER,
        // allowNull: false
    },
    description: {
        type: STRING
    },
    videoURL: {
        type: STRING,
        // allowNull: false
    },
    githubURL: {
        type: STRING,
        // allowNull: false
    },
  });
};