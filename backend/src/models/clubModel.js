const mongoose = require('mongoose');

const clubSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter club name'],
    },
    logoImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Please enter club description'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, `Please enter club creator's user ID`],
      ref: 'User',
    },
    admins: [
      {
        type: String,
        required: [true, 'Please enter admin email IDs'],
      },
    ],
    acceptedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    pendingMembers: [
      {
        type: String,
        required: [true, 'Please enter pending member email IDs'],
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge',
      },
    ],
    status: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Club', clubSchema);
