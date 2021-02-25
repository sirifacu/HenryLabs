const { STRING, Sequelize, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('feedback', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        rating: {
            type: INTEGER
        },
        comment: {
            type: STRING(500)
        }
    })
}
