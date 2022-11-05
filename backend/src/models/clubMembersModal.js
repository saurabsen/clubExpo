const mongoose = require('mongoose');

const clubMemberSchema = mongoose.Schema({
  club_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  request: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Club_Members', clubMemberSchema);
