const Book = require('../models/Book.model');
const Author = require('../models/Author.model');

exports.getAllBooks = async (req, res, next) => {
    await Book.findAll({ include: [Author]})
    .then(books => {
        res.status(200).json({
            booksCount: books.length,
            books: books
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getBook = async (req, res, next) => {
    await Book.findByPk(req.params.BookId, { include: [Author]})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Book fetched successfuly',
                Book: result
            });
        } else {
            res.status(404).json({
                message: 'no Book found',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.postBook = async (req, res, next) => {
    await Book.create({
        title: req.body.title,
        isbn: req.body.isbn,
        description: req.body.description,
        genre: req.body.genre,
        price: req.body.price,
        pubDate: req.body.pubDate,
        coverUrl: req.file.path,
        authorId: req.body.authorId,
        reviewId: req.body.reviewId,
    })
    .then(result => {
        res.status(201).json({
            message: 'Book was created successfully',
            Book: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.updateBook = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await Book.update(valuesToChange, { where: { id: req.params.BookId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Book updated successfully',
                Book: result
            });
        } else {
            res.status(404).json({
                message: 'Book not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.deleteBook = async (req, res, next) => {
    await Book.destroy({ where: { id: req.params.BookId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Book deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no Book found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.deleteAllBooks = async (req, res, next) => {
    await Book.destroy({where:{}})
    .then((result) => {
        res.status(200).json({
            message:'Book deletion completed'
        });
    })
    .catch((err) => {
        res.status(500).json({ thing: 'Book', message: err.message, error: err });
    });
};