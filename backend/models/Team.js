const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  designation: String,
  specialization: String,
  experience: Number,
  features: [String],
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", teamSchema);
