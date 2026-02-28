const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { storage } = require("../config/cloudinary"); //

const upload = multer({ storage }); //

// 🔹 Admin Create Member
// Added upload.single("image") middleware here
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { email, name, designation, department, specialization, experienceYears } = req.body;

    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // Capture the permanent Cloudinary URL
    const imageUrl = req.file ? req.file.path : req.body.image;

    const member = await Member.create({
      email,
      name,
      designation,
      department,
      specialization,
      experienceYears,
      image: imageUrl // Now saves the HTTPS link
    });

    res.status(201).json(member);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get All Members (For Admin)
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// 🔹 Delete Member
router.delete("/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: "Member deleted" });
});

module.exports = router;