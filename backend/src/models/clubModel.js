const mongoose = require("mongoose");

const clubSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", clubSchema);
