const {ENUM, Sequelize} = require('sequelize')

module.exports = (sequelize) => {

    const Apply = sequelize.define('apply', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
          },
        jobId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        state: {
            type: ENUM({
              values: ['Activo', 'Finalizado'],
            }),
            defaultValue: 'Activo'
          },
    })
    return Apply
}