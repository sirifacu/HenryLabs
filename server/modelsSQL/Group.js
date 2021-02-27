const { Sequelize, STRING, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('group', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        title: {
            type: STRING,
            required: true
        },
        numberGroup: {
            type: INTEGER,
            required: true
        }
    })
}