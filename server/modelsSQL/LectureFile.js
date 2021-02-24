const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('lectureFile', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    lectureId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: false
    },
    fileId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: false
    },
  });
};