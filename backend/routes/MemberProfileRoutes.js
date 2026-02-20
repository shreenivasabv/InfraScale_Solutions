const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const auth = require("../middleware/auth");

// 🔹 Get All (Public Team Page)
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// 🔹 Get Current User Profile (JWT Protected)
router.get("/me", auth, async (req, res) => {
  try {
    const member = await Member.findById(req.user.id);
    if (!member) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 🔹 Get Single Member
router.get("/:id", async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
});

// 🔹 Update Current User Profile (JWT Protected)
router.put("/me", auth, async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// 🔹 Update Profile (Admin or By ID)
router.put("/:id", async (req, res) => {
  const updated = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;