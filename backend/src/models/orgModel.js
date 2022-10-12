const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    name: {
      type: String,
      required: [true, "Please add a name for this organization"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    zipCode: {
      type: String,
      required: [true, "Please add a zip code"],
    },
    country: {
      type: String,
      required: [true, "Please add a country"],
    },
    phone_number: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    email: {
      type: Number,
      required: [true, "Please add an email"],
    },
    admins: {
      type: Array,
      required: [true, "Please add admin/s"],
    },
    clubs: {
      type: Array,
      required: [true, "Please add clubs or an empty array"],
    },
    terms_conditions: {
      type: String,
      required: [true, "Please add terms and conditions for new clubs"],
    },
  }
)

module.exports = mongoose.model("Organization", orgSchema)