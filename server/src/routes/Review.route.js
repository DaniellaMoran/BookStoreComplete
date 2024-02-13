const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const reviewController = require('../controllers/Review.controller');

router.get('/', reviewController.getAllReviews);
router.get('/:ReviewId', reviewController.getReview);
router.post('/', checkAuth, reviewController.postReview);
router.patch('/:ReviewId', checkAuth, reviewController.updateReview);
router.delete('/:ReviewId', checkAuth, reviewController.deleteReview);

module.exports = router;