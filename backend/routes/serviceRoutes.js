const router = require("express").Router();
const Service = require("../models/Service");
const multer = require("multer");
const path = require("path");

// 1. Setup Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. The POST Route
// Note: upload.single("image") must come BEFORE the async function
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // If multer fails or file is missing
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Now req.body will actually contain your title and description
    const { title, description } = req.body;

    const newService = new Service({
      title: title,
      description: description,
      image: req.file.path.replace(/\\/g, "/") // formats path for browser
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Validation or Server Error" });
  }
});

// GET and DELETE remain the same...
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;