const mongoose = require("mongoose")

const proposalSchema = mongoose.Schema(
  {
    club_name: {
      type: String,
      required: [true, "Please enter your proposed club name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of your proposed club"],
    },
    no_of_events_month: {
      type: Number,
      required: [true, "Please enter your estimate number of events per month"],
    },
    requested_by: {
      type: String,
      required: [true, "Please enter primary key of user proposing this club"],
    },
    members: {
      type: Array,
      required: [true, "Please enter an array of primary keys of users co-proposing the club"],
    },
  }
)

module.exports = mongoose.model("Proposal", proposalSchema);