// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/current', userController.getUserData);
router.put('/users/current', userController.updateUser);
router.delete('/users/current', userController.deleteUser);

module.exports = router;
