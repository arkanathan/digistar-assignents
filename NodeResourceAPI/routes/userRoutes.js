const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, restoreUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/users', verifyToken, checkRole('admin'), getAllUsers);
router.get('/user/:id', verifyToken, getUser);
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, checkRole('admin'), deleteUser);

module.exports = router;
