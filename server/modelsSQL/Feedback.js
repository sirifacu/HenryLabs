const { STRING, Sequelize, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('feedback', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        lectureRating: {
            type: INTEGER
        },
        lectureComment: {
            type: STRING(500)
        },
        instructorRating: {
            type: INTEGER
        },
        instructorComment: {
            type: STRING(500)
        }
    })
}
