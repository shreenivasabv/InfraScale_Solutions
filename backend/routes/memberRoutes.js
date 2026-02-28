const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getMyProfile,
  updateMyProfile
} = require("../controllers/MemberController");

// Protected routes
router.get("/me", auth, getMyProfile);
router.put("/me", auth, updateMyProfile);

module.exports = router;