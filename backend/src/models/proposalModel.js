const mongoose = require("mongoose")

const proposalSchema = mongoose.Schema(
  {
    clubName: {
      type: String,
      required: [true, "Please enter your proposed club name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of your proposed club"],
    },
    noOfEventsMonth: {
      type: Number,
      required: [true, "Please enter your estimate number of events per month"],
    },
    requestedBy: {
      type: String,
      required: [true, "Please enter primary key of user proposing this club"],
    },
    members: {
      type: Array,
      required: [true, "Please enter an array of primary keys of users co-proposing the club"],
    },
    approvalStatus: {
      type: String,
      required: [true, "Please enter the approval status of this club"],
    },
    approvalStatusReason: {
      type: String,
      required: [false, "Please enter an array of primary keys of users co-proposing the club"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Proposal", proposalSchema);