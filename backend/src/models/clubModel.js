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
      required: true,
      ref: 'User',
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
      required: [true, `Please enter club's status - active or archived`],
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
