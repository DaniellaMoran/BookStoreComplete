const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance

// username not unique

// json user post
// "lastName":"moran",
// "firstName":"daniella",
// "mail":"foo@bar.com",
// "userName":"usrname1",
// "password":"11AB1s1111"

let tableName = "Users";
const User = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { 
            notEmpty: true,
            isAlpha: { msg: 'Last name must be only letters.' }
        }
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: { msg: 'First name must be only letters.' }
        }
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: { msg: 'Email must be of format foo@bar.com' }
        },
        unique: true
    },
    userName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: {
                args: [6,13],
                msg: 'Username must be minimus 6 and maximum 13 letters.'
            }
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            // is: {
            //     args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
            //     msg: 'model Password must contain 1 uppercase, 1 lowercase and one digit, and length 8-16.'
            // }
        }
    },
}, {
    tableName: tableName
});

module.exports = User;