const router = require("express").Router();
const controller = require("../controllers/detailedServiceController");
const auth = require("../middleware/auth");
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // Import your Cloudinary config

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

// Public - list all
router.get("/", controller.getAllDetailedServices);

// Public - get by slug
router.get("/:slug", controller.getDetailedServiceBySlug);

/**
 * Protected - create
 * Use upload.single("architectureImage") to handle the file upload.
 * "architectureImage" must match the key name you use in Postman or your Frontend Form.
 */
router.post("/", auth, upload.single("architectureImage"), controller.createDetailedService);

/**
 * Protected - update
 * Added upload.single here too in case you want to change the image later.
 */
router.put("/:id", auth, upload.single("architectureImage"), controller.updateDetailedService);

// Protected - delete
router.delete("/:id", auth, controller.deleteDetailedService);

module.exports = router;