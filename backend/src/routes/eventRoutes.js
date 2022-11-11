const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { 
  createEvent, 
  getEventDetails, 
  getMultipleEventsFromClubs,
  updateEvent,
  deleteEvent,
  addUserToEvent,
  removeUserFromEvent } = require('../controllers/eventController');

  router.post("/latestfromclubs", protect, getMultipleEventsFromClubs);
  router.get("/:eventId", protect, getEventDetails);
  router.put("/:eventId", protect, updateEvent);
  router.delete("/:eventId", protect, deleteEvent);
  router.post("/", protect, createEvent);
  router.post("/:eventid/attendedby/:userid", addUserToEvent);
  router.post("/:eventid/unattendedby/:userid", removeUserFromEvent);

// router.get("/events?filter=latest", getEventDetails);
// router.get("/events/latest?userId=iddxxx", getEventDetails);
// router.get("/events/:id", getEventDetails);
// router.get("/users/:userId/events/latest", getEventDetails);
// router.get("/users/:userId/events", getEventDetails);

module.exports = router;