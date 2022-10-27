const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, getUsers, deleteUser, addClubToUser, removeClubFromUser, addEventToUser, removeEventFromUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.delete('/me/:id', deleteUser);
router.post('/allusers', getUsers);
router.post('/:userid/join/:clubid', addClubToUser);
router.post('/:userid/remove/:clubid', removeClubFromUser);
router.post('/:userid/attend/:eventid', addEventToUser);
router.post('/:userid/unattend/:eventid', removeEventFromUser);

module.exports = router;
