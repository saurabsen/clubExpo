const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, getUsers, deleteUser, addClubToUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.delete('/me/:id', deleteUser);
router.post('/allusers', getUsers);
router.post('/:userid/join/:clubid', addClubToUser);

module.exports = router;
