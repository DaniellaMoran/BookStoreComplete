const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:UserId', userController.getUser);
router.patch('/:UserId', userController.updateUser);
router.delete('/:UserId', userController.deleteUser);

module.exports = router;