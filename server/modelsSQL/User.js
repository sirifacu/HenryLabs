const { Sequelize, INTEGER, STRING, DATE, DECIMAL } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        firstName: {
            type: STRING
        },
        lastName: {
            type: STRING
        },
        dateOfBirth: {
            type: DATE
        },
        role: {
            type: INTEGER,
            defaultValue: 0
        },
        email: {
            type: STRING,
            isEmail: true,
            unique: true
        },
        address: {
            type: STRING
        },
        city: {
            type: STRING
        },
        state: {
            type: STRING
        },
        country: {
            type: STRING
        },
        nationality: {
            type: STRING
        },
        profileImage: {
            type: STRING(3000)
        },
        description: {
            type: STRING
        },
        password: {
            type: STRING
        },
        salt: {
            type: STRING
        },
        cellphone: {
            type: INTEGER
        },
        recoveryToken: {
            type: INTEGER
        },
        passwordResetExpires: {
            type: DECIMAL
        },
        githubAccount: {
            type: STRING,
            unique: true
        },
        googleAccount: {
            type: STRING,
            unique: true
        },
        codewarsRank: {
            type: INTEGER
        },
        codewarsPoints: {
            type: INTEGER
        },
        migrationsQuantitys: {
            type: INTEGER
        },
        checkpoint1: {
            type: INTEGER
        },
        checkpoint2: {
            type: INTEGER
        },
        checkpoint3: {
            type: INTEGER
        },
        checkpoint4: {
            type: INTEGER
        }
    });
};
