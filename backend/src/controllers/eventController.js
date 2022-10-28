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

// @desc get multiple events using club ids
// @route POST /api/events
// @access Public
/* 
Body must be structured as follows:
{
  "clubIds" : ["ClubId#1", "ClubId#2", ...]
}
*/
const getMultipleEventsFromClubs = asyncHandler(async (req, res) => {
  const { clubIds } = req.body;
  
  const clubFilters = [];

  clubIds.forEach((id) => {
    clubFilters.push(
      { clubId: id }
    )
  });

  const filterObject = {
    $or: clubFilters
  };

  const events = await Event.find(filterObject);

  res.status(200).json(events);
})

// @desc update event
// @route PUT /api/events
// @access Public
const updateEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  let targetEvent = await Event.findOne({ _id: eventId })

  if (!targetEvent) {
    res.status(404).json(
      {
        message: "Can't find record of event"
      }
    )
  }

  const {name, featureImage, description, startDate, endDate, attendees, type, location, contact, clubId, createdByAdmin, availableSpots} = req.body;

  // Check if all information is entered
  if (!name || !featureImage || !description || !startDate || !endDate || !attendees || !type || !location || !contact || !clubId || !createdByAdmin || !availableSpots) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  targetEvent.name = name;
  targetEvent.featureImage = featureImage;
  targetEvent.description = description;
  targetEvent.startDate = startDate;
  targetEvent.endDate = endDate;
  targetEvent.attendees = attendees;
  targetEvent.type = type;
  targetEvent.location = location;
  targetEvent.contact = contact;
  targetEvent.clubId = clubId;
  targetEvent.createdByAdmin = createdByAdmin;
  targetEvent.availableSpots = availableSpots;

  await targetEvent.save();

  res.status(200).json(
    {
      message: `Event with ID ${eventId} updated.`
    }
  )
});


// @desc delete event
// @route DELETE /api/events
// @access Public
const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const targetEvent = await Event.findOne({_id: eventId});

  if (!targetEvent) {
    res.status(404).json(
      {
        message: "Can't find record of event"
      }
    )
  }

  await Event.deleteOne({_id: eventId})
  .then((err) => {
    if (err) {console.log(err)};
    console.log(`Event with ID ${eventId} deleted`)
  });

  res.status(200).json(
    {
      message: "Successful delete"
    }
  )
})


// @desc Add user to Event
// @route POST /api/events/:eventid/attendedby/:userid
// @access Private
const addUserToEvent = asyncHandler(async (req, res) => {
  const { eventid, userid } = req.params;

  // Check if user exist
  const existEvent = await Event.findOne({ _id: eventid });

  if (!existEvent) {
    res.status(400);
    throw new Error('Event not found');
  }

  let attendeesArray = existEvent.attendees;
  const targetIndex = attendeesArray.indexOf(userid);


  if (targetIndex === -1) {
    attendeesArray.push(userid)
  } else {
    res.status(400);
    throw new Error('User is already part of event');
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventid, {attendees: attendeesArray}) 

  if (updatedEvent) {
    res.status(200).json({
      id: updatedEvent.id,
      attendees: attendeesArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

}) 

// @desc Remove user from Event
// @route POST /api/events/:eventid/unattendedby/:userid
// @access Private
const removeUserFromEvent = asyncHandler(async (req, res) => {
  const { eventid, userid } = req.params;

  // Check if user exist
  const existEvent = await Event.findOne({ _id: eventid });

  if (!existEvent) {
    res.status(400);
    throw new Error('Event not found');
  }

  let attendeesArray = existEvent.attendees;
  const targetIndex = attendeesArray.indexOf(userid);

  if (targetIndex === -1) {
    res.status(400);
    throw new Error('User is not part of this event');
  } else {
    attendeesArray.splice(targetIndex, 1)
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventid, {attendees: attendeesArray}) 

  if (updatedEvent) {
    res.status(200).json({
      id: updatedEvent.id,
      attendees: attendeesArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

})


module.exports = {
  createEvent,
  getEventDetails,
  getMultipleEventsFromClubs,
  updateEvent,
  deleteEvent,
  addUserToEvent,
  removeUserFromEvent,
}