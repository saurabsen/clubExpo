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
    noOfEventsMonth: {
      type: Number,
      required: [true, 'Please enter your estimate number of events per month'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, `Please enter proposal creator's user ID`],
      ref: 'User',
    },
    creatorName: {
      type: String,
      required: [true, `Please enter proposal creator's Name`],
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
    isManageClub: {
      type: Boolean,
    },
    clubPurpose: {
      type: String,
    },
    clubInterest: {
      type: String,
    },
    clubActivities: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
