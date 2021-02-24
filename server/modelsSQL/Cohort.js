const { STRING, Sequelize, INTEGER, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('cohort', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: {
            type: STRING,
        },
        num: {
            type: INTEGER,
        },
        startDate:{
            type: DATE,
        }
    })
}