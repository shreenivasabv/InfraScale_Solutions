const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");

const upload = require("../middleware/cloudinaryUpload");

// 🔹 Get All Team Members (Public)
router.get("/", async (req, res) => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team" });
  }
});

// 🔹 Get Single Team Member (Public)
router.get("/:id", async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member", error: err.message });
  }
});

// 🔹 Admin Create Team Member
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, email, designation, specialization, experience, features } = req.body;

    if (!name || !email || !designation) {
      return res.status(400).json({ message: "Name, email, and designation are required" });
    }

    const existing = await Team.findOne({ email });
    if (existing) return res.status(400).json({ message: "Member already exists" });
    console.log("FILE DATA:", req.file);

    // req.file.path is now the permanent Cloudinary HTTPS URL
   const imageUrl = req.file?.path || req.file?.secure_url || "";
    const cloudinaryId = req.file ? req.file.filename : "";

    const member = await Team.create({
      name,
      email,
      designation,
      specialization,
      experience: Number(experience),
      features: Array.isArray(features) ? features : JSON.parse(features || "[]"),
      image: imageUrl, // Save the full URL to MongoDB
      cloudinaryId
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Error creating member", error: err.message });
  }
});

// 🔹 Admin Update Team Member
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {

    const member = await Team.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    const updateData = {
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      specialization: req.body.specialization,
      experience: Number(req.body.experience)
    };

    if (req.body.features) {
      updateData.features = Array.isArray(req.body.features)
        ? req.body.features
        : JSON.parse(req.body.features);
    }

    if (req.file) {

      // delete old image
      if (member.cloudinaryId) {
        await cloudinary.uploader.destroy(member.cloudinaryId);
      }

      updateData.image = req.file.path;
      updateData.cloudinaryId = req.file.filename;
    }

    const updated = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Error updating member", error: err.message });
  }
});

// 🔹 Admin Delete Team Member
router.delete("/:id", auth, async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member", error: err.message });
  }
});

module.exports = router;