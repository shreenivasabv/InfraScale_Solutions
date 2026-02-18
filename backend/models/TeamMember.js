const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  designation: String,
  certifications: [String],
  experience: Number,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model("TeamMember", teamSchema);
