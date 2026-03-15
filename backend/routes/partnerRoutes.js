const express = require("express");
const router = express.Router();
const upload = require("../middleware/cloudinaryUpload"); // Use your existing middleware
const partnerController = require("../controllers/partnerController");

// This defines the /api/partners/ endpoint
router.get("/", partnerController.getPartners);

// This defines the /api/partners/add endpoint
router.post("/add", upload.single("image"), partnerController.addPartner);

module.exports = router;