const express = require('express');
const router = express.Router();
const { getClubs, setClubs, updateClubs, deleteClubs } = require('../controllers/clubControllers');

router.route('/').get(getClubs).post(setClubs);
router.route('/:id').put(updateClubs).delete(deleteClubs);

module.exports = router;
