const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/Order.controller');;

router.get('/', checkAuth, orderController.getAllOrders);
router.get('/:OrderId', checkAuth, orderController.getOrder);
router.post('/', checkAuth, orderController.postOrder);
router.patch('/:OrderId', checkAuth, orderController.updateOrder);
router.delete('/:OrderId', checkAuth, orderController.deleteOrder);

module.exports = router;