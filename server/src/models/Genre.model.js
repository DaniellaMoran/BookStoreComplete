const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance

// "name":"lo"

let tableName = "Genres";
const Genre = sequelize.define(tableName, {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        primaryKey: true,
        unique: true
    },
}, {
    tableName: tableName
});

module.exports = Genre;