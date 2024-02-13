const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const deleteRoutes = require('./src/routes/Delete.route');
const authorRoutes = require('./src/routes/Author.route');
const bookRoutes = require('./src/routes/Book.route');
const genreRoutes = require('./src/routes/Genre.route');
const orderRoutes = require('./src/routes/Order.route');
const orderedBooksRoutes = require('./src/routes/OrderedBooks.route');
const reviewRoutes = require('./src/routes/Review.route');
const userRoutes = require('./src/routes/User.route');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
        return res.status(200).json({});
    }
    next();
});

app.use('/delete', deleteRoutes);
app.use('/Author', authorRoutes);
app.use('/Book', bookRoutes);
app.use('/Genre', genreRoutes);
app.use('/Order', orderRoutes);
app.use('/OrderedBooks', orderedBooksRoutes);
app.use('/Review', reviewRoutes);
app.use('/User', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;