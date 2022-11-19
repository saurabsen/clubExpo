const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createEvent,
  getEventDetails,
  getMultipleEventsFromClubs,
  getEventsByUser,
  getEvents,
  updateEvent,
  deleteEvent,
  addUserToEvent,
  removeUserFromEvent,
} = require('../controllers/eventController');

router.post('/latestfromclubs', protect, getMultipleEventsFromClubs);
router.get('/:eventId', protect, getEventDetails);
router.put('/:eventId', protect, updateEvent);
router.delete('/:eventId', protect, deleteEvent);
router.post('/', protect, createEvent);
router.post('/:eventid/attendedby/:userid', addUserToEvent);
router.post('/:eventid/unattendedby/:userid', removeUserFromEvent);
router.get('/previousevents/:clubid', protect, getEvents);
router.post('/user', protect, getEventsByUser);

module.exports = router;
