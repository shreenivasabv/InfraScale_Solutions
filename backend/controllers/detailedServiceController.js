const DetailedService = require("../models/DetailedService");

// Create a new Detailed Service
exports.createDetailedService = async (req, res) => {
  try {
    const {
      title,
      slug,
      heroDescription,
      fullDescription,
      overview,
      technologies,
      benefits,
      useCases,
      architectureImage,
      faqs,
    } = req.body;

    // Basic validation
    if (!title || !slug) {
      return res.status(400).json({ message: "Title and slug are required" });
    }

    // Prevent duplicate slug
    const exists = await DetailedService.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Slug already exists" });
    }

    const doc = await DetailedService.create({
      title,
      slug,
      heroDescription,
      fullDescription,
      overview,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : []),
      benefits: Array.isArray(benefits) ? benefits : (benefits ? [benefits] : []),
      useCases: Array.isArray(useCases) ? useCases : (useCases ? [useCases] : []),
      architectureImage,
      faqs: Array.isArray(faqs) ? faqs : (faqs ? [faqs] : []),
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create detailed service" });
  }
};

// Get all Detailed Services
exports.getAllDetailedServices = async (req, res) => {
  try {
    const docs = await DetailedService.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch detailed services" });
  }
};

// Get by slug
exports.getDetailedServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const doc = await DetailedService.findOne({ slug });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch detailed service" });
  }
};

// Update (admin)
exports.updateDetailedService = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const doc = await DetailedService.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

// Delete (admin)
exports.deleteDetailedService = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DetailedService.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
