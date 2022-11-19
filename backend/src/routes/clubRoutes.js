const express = require('express');
const router = express.Router();
const {
  createClub,
  getClubByMember,
  getClubByAdmin,
  getClub,
  getClubs,
  updateClub,
  deleteClub,
} = require('../controllers/clubControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createClub).get(protect, getClubs);
router.route('/user/:id').get(protect, getClubByAdmin);
router.route('/members/:userid').get(protect, getClubByMember);
router
  .route('/:id')
  .get(protect, getClub)
  .put(protect, updateClub)
  .delete(protect, deleteClub);

module.exports = router;
