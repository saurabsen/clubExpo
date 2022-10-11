const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel.js');

// @desc create event
// @route POST /api/event/single
// @access Public
const createEvent = asyncHandler(async (req, res) => {
  const {name, featureImage, description, startDate, endDate, attendees, type, location, contact, clubId, createdByAdmin, availableSpots} = req.body;

  // Check if all information is entered
  if (!name || !featureImage || !description || !startDate || !endDate || !attendees || !type || !location || !contact || !clubId || !createdByAdmin || !availableSpots) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  const event = await Event.create({
    name: name,
    featureImage: featureImage,
    description: description,
    startDate: startDate,
    endDate: endDate,
    attendees: attendees,
    type: type,
    location: location,
    contact: contact,
    clubId: clubId,
    createdByAdmin: createdByAdmin,
    availableSpots: availableSpots
  })

  if (event) {
    res.status(201).json({
      _id: event.id,
      name: event.name,
      createdByAdmin: event.createdByAdmin,
    })
  } else {
    res.status(400);
    throw new Error("Failed to create event. Check event details.")
  }
})


// @desc get single event
// @route GET /api/event/single
// @access Public
const getEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findOne({ _id: eventId })

  res.status(200).json({
    _id: event.id,
    name: event.name,
    description: event.description
  })
})

// @desc get multiple events
// @route GET /api/events
// @access Public

// @desc update event
// @route PUT /api/events
// @access Public

// @desc delete event
// @route DELETE /api/events
// @access Public

module.exports = {
  createEvent,
  getEventDetails
}