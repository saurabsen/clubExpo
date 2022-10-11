const express = require('express');
const router = express.Router();
const { createEvent, getEventDetails } = require('../controllers/eventController');

router.post("/", createEvent);
router.get("/:eventId", getEventDetails);

// router.get("/events?filter=latest", getEventDetails);
// router.get("/events/latest?userId=iddxxx", getEventDetails);
// router.get("/events/:id", getEventDetails);
// router.get("/users/:userId/events/latest", getEventDetails);
// router.get("/users/:userId/events", getEventDetails);

module.exports = router;