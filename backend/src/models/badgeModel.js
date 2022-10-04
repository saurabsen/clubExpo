const mongoose = requre("mongoose");

const badgeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for this badge"]
    },
    club_id: {
      type: String,
      required: [true, "Please add the primary key of the club that owns this badge"]
    },
    image_url: {
      type: String,
      required: [true, "Please add the url for badge image"]
    },
    created_by: {
      type: String,
      required: [true, "Please add the primary key of user that created this badge"]
    },
    badge_type: {
      type: String,
      required: [true, "Please add the badge type"]
    },
    organization_id: {
      type: String,
      required: [true, "Please add the primary key of the organization the club belongs to"]
    },
  }
)

module.exports = mongoose.model("Badge", badgeSchema)