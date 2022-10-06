const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema(
  {
    event_id: {
      type: String,
      required: [true, "Please add primary key of event related to this transaction"]
    },
    user_id: {
      type: String,
      required: [true, "Please add primary key of user related to this transaction"]
    },
    status: {
      type: String,
      required: [true, "Please add status of this transaction"]
    },
    price: {
      type: Number,
      required: [true, "Please price associated with this transaction"]
    },
    billing_details: {
      type: Array,
      required: [true, "Please add billing details"]
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Transaction", transactionSchema)