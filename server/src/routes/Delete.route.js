const express = require('express');
const router = express.Router();
const sequelize = require('../../sequelize');
const Author = require('../models/Author.model');
const Book = require('../models/Book.model');
const Genre = require('../models/Genre.model');
const Order = require('../models/Order.model');
const OrderedBooks = require('../models/OrderedBooks.model');
const Review = require('../models/Review.model');
const User = require('../models/User.model');

router.delete('/', async (req, res, next) => {
    console.log("delete");
    OrderedBooks.destroy({where:{},}).then((result) =>{
        Order.destroy({where:{}}).then((result) => {
            Review.destroy({where:{}}).then((result) => {
                User.destroy({where:{}}).then((result) => {
                    Book.destroy({where:{}}).then((result) => {
                        Author.destroy({where:{}}).then((result) => {
                            Genre.destroy({where:{}}).then((result) => {
                                res.status(200).json({
                                    message:'deletion completed'
                                });
                            }).catch((err) => {
                                res.status(500).json({ thing: 'Genre', message: err.message, error: err });
                            });
                        }).catch((err) => {
                            res.status(500).json({ thing: 'Author', message: err.message, error: err });
                        });
                    }).catch((err) => {
                        res.status(500).json({ thing: 'Book', message: err.message, error: err });
                    });
                }).catch((err) => {
                    res.status(500).json({ thing: 'User', message: err.message, error: err });
                });
            }).catch((err) => {
                res.status(500).json({ thing: 'Review', message: err.message, error: err });
            });
        }).catch((err) => {
            res.status(500).json({ thing: 'Order', message: err.message, error: err });
        });
    }).catch((err) => {
        res.status(500).json({ thing: 'OrderedBooks', message: err.message, error: err });
    });
});

module.exports = router;
