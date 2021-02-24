const { STRING, ENUM } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: STRING,
            required: true
        },
        mail: {
            type: STRING
        },
        role: {
            type: ENUM ({
                values: ['Alumno', 'PM', 'Hero', 'Instructor']
            })
        }
        
    })
}