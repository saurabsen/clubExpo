const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.delete('/me/:id', deleteUser);
router.post('/allusers', getUsers)

module.exports = router;
