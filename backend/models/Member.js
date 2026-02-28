const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({

  teamMemberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String
  },

  isRegistered: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);