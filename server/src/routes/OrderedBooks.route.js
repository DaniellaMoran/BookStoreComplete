const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderedBooksController = require('../controllers/OrderedBooks.controller');

router.get('/', checkAuth, orderedBooksController.getAllOrderedBooks);
router.get('/:OrderedBooksId', checkAuth, orderedBooksController.getOrderedBook);
router.post('/', checkAuth, orderedBooksController.postOrderedBook);
router.patch('/:OrderedBooksId', checkAuth, orderedBooksController.updateOrderedBooks);
router.delete('/:OrderedBooksId', checkAuth, orderedBooksController.deleteOrderedBook);
router.delete('/', checkAuth, orderedBooksController.deleteAllOrderedBooks);

module.exports = router;