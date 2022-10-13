const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEventDetails, 
  getMultipleEventsFromClubs,
  updateEvent,
  deleteEvent } = require('../controllers/eventController');

  router.post("/latestfromclubs", getMultipleEventsFromClubs);
  router.get("/:eventId", getEventDetails);
  router.put("/:eventId", updateEvent);
  router.delete("/:eventId", deleteEvent);
  router.post("/", createEvent);

// router.get("/events?filter=latest", getEventDetails);
// router.get("/events/latest?userId=iddxxx", getEventDetails);
// router.get("/events/:id", getEventDetails);
// router.get("/users/:userId/events/latest", getEventDetails);
// router.get("/users/:userId/events", getEventDetails);

module.exports = router;