const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const detailedServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  heroDescription: { type: String },
  fullDescription: { type: String },
  overview: { type: String },
  technologies: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  useCases: { type: [String], default: [] },
  architectureImage: { type: String },
  faqs: { type: [faqSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DetailedService", detailedServiceSchema);
