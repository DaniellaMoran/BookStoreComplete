const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance
const User = require('./User.model');

let tableName = "Orders";
const Order = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            notFutureDate(value) {
                const currentDate = new Date();
                const reviewDate = new Date(value);
                reviewDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
            
                if (reviewDate > currentDate) {
                    throw new Error('Date must not be in the future.');
                }
            }
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        references: {
            model: User,
            key: 'id',
        }
    },
    totalCost: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: { msg: 'Total cost must be a number'}
        },
    },
    status: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: {
                args: /^[0-5]{1}$/,
                msg: 'Status must be between 0-5 inclusive'
            }
        },
    }
}, {
    tableName: tableName
});

module.exports = Order;