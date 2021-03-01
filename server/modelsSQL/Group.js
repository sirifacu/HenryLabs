const { Sequelize, STRING, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('group', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        number: {
            type: INTEGER,
            required: true
        }
    })
}