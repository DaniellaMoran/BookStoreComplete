const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance

// no null GOOD
// no empty GOOD

// "firstName":"David",
// "lastName":"Broza"

let tableName = "Authors";
const Author = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        validate: {
            notEmpty: true 
        },
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: { msg: 'First name must be only letters.' }
        }
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: { msg: 'Last name must be only letters.' }
        }
    },
}, {
    tableName: tableName
});

module.exports = Author;