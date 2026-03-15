const Partner = require("../models/Partner");

// Logic to GET partners
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Error fetching partners" });
  }
};

// Logic to POST a new partner
exports.addPartner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newPartner = new Partner({
      image: req.file.path, // URL from Cloudinary
      cloudinary_id: req.file.filename // Public ID from Cloudinary
    });

    const savedPartner = await newPartner.save();
    res.status(201).json(savedPartner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};