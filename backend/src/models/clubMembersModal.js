const mongoose = require('mongoose');

const clubMemberSchema = mongoose.Schema({
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubs',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  status: {
    type: Boolean,
  },
  request: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Club_Members', clubMemberSchema);
