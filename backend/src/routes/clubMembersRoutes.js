const express = require('express');
const router = express.Router();
const {
  getClubMembers,
  getIndividualMember,
  storeIndividualMember,
} = require('../controllers/clubMembersController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, storeIndividualMember);
router.post('/', protect, getClubMembers);
router.get('/:userid/:clubid', protect, getIndividualMember);

module.exports = router;
