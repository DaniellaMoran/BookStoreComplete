const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');
const Genre = require('./Genre.model');
const Author = require('./Author.model');

let tableName = "Books";
const Book = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true 
        },
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    isbn: {
        type: DataTypes.STRING(13),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: {
                args: /^(978|979)[0-9]{10}$/,
                msg: 'Isbn must be only numbers by the isbn pattern'
            }
        }
    },
    description: {
        type: DataTypes.STRING(1300),
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    genre: {
        type: DataTypes.STRING(255),
        references: {
            model: Genre,
            key: 'name',
        },
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        }
    },
    pubDate: {
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
        }
    },
    coverUrl: {
        type: DataTypes.STRING(2083),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    authorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id',
        },
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: tableName
});

module.exports = Book;