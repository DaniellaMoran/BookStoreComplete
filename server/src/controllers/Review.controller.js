const Review = require('../models/Review.model');
const User = require('../models/User.model');
const Book = require('../models/Book.model');

exports.getAllReviews = async (req, res, next) => {
    await Review.findAll({ include: Book})
    .then(Reviews => {
        res.status(200).json({
            ReviewsCount: Reviews.length,
            Reviews: Reviews
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getReview = async (req, res, next) => {
    await Review.findByPk(req.params.ReviewId, { include: Book})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Review fetched successfuly',
                Review: result
            });
        } else {
            res.status(404).json({
                message: 'no Review found',
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

exports.postReview = async (req, res, next) => {
    await Review.create({
        bookId: req.body.bookId,
        userId: req.body.userId,
        text: req.body.text,
        creationDate: req.body.creationDate,
        starNum: req.body.starNum,
    })
    .then(result => {
        res.status(201).json({
            message: 'Review was created successfully',
            Review: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.updateReview = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await Review.update(valuesToChange, { where: { id: req.params.ReviewId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Review updated successfully',
                Review: result
            });
        } else {
            res.status(404).json({
                message: 'Review not found'
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

exports.deleteReview = async (req, res, next) => {
    await Review.destroy({ where: { id: req.params.ReviewId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Review deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no Review found'
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