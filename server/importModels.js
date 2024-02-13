console.log("importing models");

const Author = require('./src/models/Author.model');
const Genre = require('./src/models/Genre.model');
const User = require('./src/models/User.model');
const Book = require('./src/models/Book.model');
const Review = require('./src/models/Review.model');
const Order = require('./src/models/Order.model');
const OrderedBooks = require('./src/models/OrderedBooks.model');

Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });

Book.belongsTo(Genre, { foreignKey: 'genre' }); // A Book belongs to one Genre
Genre.hasMany(Book, { foreignKey: 'genre' }); 0 

Review.belongsTo(User, { foreignKey: 'userId' }); // A Review belongs to one User
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Book, { foreignKey: 'bookId' }); // A Review belongs to one Book
Book.hasMany(Review, { foreignKey: 'bookId' });

Order.belongsTo(User, { foreignKey: 'userId' }); // An Order belongs to one User
User.hasMany(Order, { foreignKey: 'userId' });

OrderedBooks.belongsTo(Order, { foreignKey: 'orderId' }); // Many OrderedBooks belong to one Order
OrderedBooks.belongsTo(Book, { foreignKey: 'bookId' });

console.log("finished importing models");