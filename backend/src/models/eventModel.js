const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for this event"],
    },
    feature_image: {
      type: String,
      required: [true, "Please add feature image url for this event"],
    },
    description: {
      type: String,
      required: [true, "Please add a description for this event"],
    },
    start_date: {
      type: Date,
      required: [true, "Please add a start date for this event"],
    },
    end_date: {
      type: Date,
      required: [true, "Please add a start date for this event"],
    },
    attendees: {
      type: Array,
      required: [true, "Please add a primary keys of users attending event or empty array"],
    },
    type: {
      type: String,
      required: [true, "Please add event type"],
    },
    location: {
      type: String,
      required: [true, "Please add location for this event"],
    },
    contact: {
      type: String,
      required: [true, "Please add contact details for this event"],
    },
    club_id: {
      type: String,
      required: [true, "Please add primary key of club hosting this event"],
    },
    create_by_admin: {
      type: String,
      required: [true, "Please add primary key of club admin that created this event"],
    },
    available_spots: {
      type: Number,
      required: [true, "Please add number of spots for this event"],
    },
  }
)

module.exports = mongoose.model("Event", eventSchema);