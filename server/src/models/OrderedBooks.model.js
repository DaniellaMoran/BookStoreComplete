const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance
const Book = require('./Book.model');
const Order = require('./Order.model');

let tableName = "OrderedBooks";
const OrderedBooks = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        autoIncrement: true,
        primaryKey: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        references: {
            model: Book,
            key: 'id',
        }
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        references: {
            model: Order,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            isNumeric: { msg: 'Quantity must be a number.' },
            min: 1
        }
    }
}, {
    tableName: tableName
});

module.exports = OrderedBooks;