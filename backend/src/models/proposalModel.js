const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema(
  {
    clubName: {
      type: String,
      required: [true, 'Please enter your proposed club name'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of your proposed club'],
    },
    noOfEventsPerMonth: {
      type: Number,
      required: [true, 'Please enter your estimate number of events per month'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, `Please enter proposal creator's user ID`],
      ref: 'User',
    },
    members: [
      {
        type: String,
        required: [true, 'Please enter member email IDs'],
      },
    ],
    approvalStatus: {
      type: String,
      required: [true, 'Please enter the approval status of the club'],
    },
    approvalStatusReason: {
      type: String,
      required: [false, 'Please enter a reason for the decided approval status'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
