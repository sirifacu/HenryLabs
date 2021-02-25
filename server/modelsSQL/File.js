const { STRING, Sequelize, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('file', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: {
            type: STRING
        },
        extension: {
            type: STRING(500)
        },
        url: {
            type: STRING(500)
        }
    })
}
