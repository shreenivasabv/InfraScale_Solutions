const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");
const multer = require("multer");
const { storage } = require("../config/cloudinary"); //

// Use Cloudinary storage instead of local diskStorage
const upload = multer({ storage });

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

    // req.file.path is now the permanent Cloudinary HTTPS URL
    const imageUrl = req.file ? req.file.path : "";

    const member = await Team.create({
      name,
      email,
      designation,
      specialization,
      experience: Number(experience),
      features: Array.isArray(features) ? features : JSON.parse(features || "[]"),
      image: imageUrl // Save the full URL to MongoDB
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Error creating member", error: err.message });
  }
});

// 🔹 Admin Update Team Member
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, email, designation, specialization, experience, features } = req.body;

    const updateData = { name, email, designation, specialization, experience: Number(experience) };
    
    if (features) {
      updateData.features = Array.isArray(features) ? features : JSON.parse(features || "[]");
    }

    // If a new file is uploaded, update the Cloudinary URL
    if (req.file) {
      updateData.image = req.file.path;
    }

    const member = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!member) return res.status(404).json({ message: "Member not found" });
    
    res.json(member);
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