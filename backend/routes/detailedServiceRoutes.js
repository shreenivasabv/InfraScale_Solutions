const router = require("express").Router();
const controller = require("../controllers/detailedServiceController");
const auth = require("../middleware/auth");

// Public - list all
router.get("/", controller.getAllDetailedServices);

// Public - get by slug
router.get("/:slug", controller.getDetailedServiceBySlug);

// Protected - create
router.post("/", auth, controller.createDetailedService);

// Protected - update
router.put("/:id", auth, controller.updateDetailedService);

// Protected - delete
router.delete("/:id", auth, controller.deleteDetailedService);

module.exports = router;
