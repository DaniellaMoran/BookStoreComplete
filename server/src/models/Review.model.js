const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance
const User = require('./User.model');
const Book = require('./Book.model');

// json review post
// "userId":"25",
// "bookId":"18",
// "creationDate":"02.20.2004",
// "starNum":"1"

let tableName = "Reviews";
const Review = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: User,
            key: 'id',
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: Book,
            key: 'id',
        }
    },
    text: {
        type: DataTypes.STRING(500),
        validate: {
            max: 500
        }
    },
    creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            // notFutureDate(value) {
            //     if (value > new Date()) {
            //         throw new Error('Date must not be in the future.');
            //     }
            // },
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
    starNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: {
                args: /^[1-5]{1}$/,
                msg: 'Star Num must be between 0-5 inclusive.'
            }
        },
    }
}, {
    tableName: tableName
});

module.exports = Review;