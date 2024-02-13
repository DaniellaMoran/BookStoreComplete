const OrderedBooks = require('../models/OrderedBooks.model');
const Order = require('../models/Order.model');
const Book = require('../models/Book.model');


exports.getAllOrderedBooks = async (req, res, next) => {
    await OrderedBooks.findAll({include: [Order,Book]})
    .then(OrderedBookss => {
        res.status(200).json({
            OrderedBookssCount: OrderedBookss.length,
            OrderedBookss: OrderedBookss
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getOrderedBook = async (req, res, next) => {
    await OrderedBooks.findByPk(req.params.OrderedBooksId, {include: [Book, Order]})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'OrderedBooks fetched successfuly',
                OrderedBooks: result
            });
        } else {
            res.status(404).json({
                message: 'no OrderedBooks found',
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

exports.postOrderedBook = async (req, res, next) => {
    await OrderedBooks.create({
        bookId: req.body.bookId,
        orderId: req.body.orderId,
        quantity: req.body.quantity
    })
    .then(result => {
        res.status(201).json({
            message: 'OrderedBooks was created successfully',
            OrderedBooks: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.updateOrderedBooks = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await OrderedBooks.update(valuesToChange, {
        where: { id: req.params.OrderedBooksId },
        returning: true
    })
    .then(result => {
        if (result[0] != 0) {
            console.log(result);
            res.status(200).json({
                message: 'OrderedBooks updated successfully.',
                affectedRowsCount: result[0],
                affectedRows: result[1]
            });
        } else {
            res.status(404).json({
                message: 'OrderedBooks not found'
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

exports.deleteOrderedBook = async (req, res, next) => {
    await OrderedBooks.destroy({ where: { id: req.params.OrderedBooksId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'OrderedBooks deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no OrderedBooks found'
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

exports.deleteAllOrderedBooks = async (req, res, next) => {
    await OrderedBooks.destroy({where:{}})
    .then((result) => {
        res.status(200).json({
            message:'OrderedBooks deletion completed'
        });
    })
    .catch((err) => {
        res.status(500).json({ thing: 'OrderedBooks', message: err.message, error: err });
    });
};