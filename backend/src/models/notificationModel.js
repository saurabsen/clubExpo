const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please add the notification messgage.'],
  },
  type: {
    type: String,
    required: [true, 'Please add the notification type - newClub, newEvent, newProposal'],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, `Please enter notification receiver's user ID`],
    ref: 'User',
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, `Please enter notification senders's user ID`],
    ref: 'User',
  },
  read: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
