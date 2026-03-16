const router = require("express").Router();
const Service = require("../models/Service");
const upload = require("../middleware/cloudinaryUpload");

// 2. Updated POST Route with Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    console.log("FILE DATA:", req.file);

    const { title, description, category ,summary} = req.body;

    const newService = new Service({
      title: title,
      description: description,
      summary:summary,
      category: category,
      // req.file.path is now the permanent Cloudinary HTTPS URL
      image: req.file.path,
      cloudinary_id: req.file.filename
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Validation or Server Error" });
  }
});

// 3. GET Route (Remains the same as your filtering logic is correct)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category: category } : {};
    
    const services = await Service.find(filter);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    if (service.cloudinary_id) {
      await cloudinary.uploader.destroy(service.cloudinary_id);
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;