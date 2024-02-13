const Order = require('../models/Order.model');
const User = require('../models/User.model');

exports.getAllOrders = async (req, res, next) => {
    await Order.findAll()
    .then(orders => {
        res.status(200).json({
            ordersCount: orders.length,
            orders: orders
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
};

exports.getOrder = async (req, res, next) => {
    await Order.findByPk(req.params.OrderId)
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Order fetched successfuly',
                Order: result
            });
        } else {
            res.status(404).json({
                message: 'no Order found',
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

exports.postOrder = async (req, res, next) => {
    await Order.create({
        date: req.body.date,
        userId: req.body.userId,
        totalCost: req.body.totalCost,
        status: req.body.status,
    })
    .then(result => {
        res.status(201).json({
            message: 'Order was created successfully',
            Order: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
            errors: err.errors
        });
    });
};

exports.updateOrder = async (req, res, next) => {
    const valuesToChange = {};
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        valuesToChange[keys[i]] = values[i];
    }

    await Order.update(valuesToChange, { where: { id: req.params.OrderId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Order updated successfully',
                Order: result
            });
        } else {
            res.status(404).json({
                message: 'Order not found'
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

exports.deleteOrder = async (req, res, next) => {
    await Order.destroy({ where: { id: req.params.OrderId }})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: 'Order deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'no Order found'
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