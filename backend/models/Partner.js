const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  // We've removed title/description since these are just logo blocks
  image: { type: String, required: true }, // Cloudinary URL
  cloudinary_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Partner", partnerSchema);