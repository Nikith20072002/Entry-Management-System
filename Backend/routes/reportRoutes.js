const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

router.get("/daily", protect, allowRoles("ADMIN"), controller.dailyVisitors);
router.get("/range", protect, allowRoles("ADMIN"), controller.visitorsByDateRange);
router.get("/flat/:flatNo", protect, allowRoles("ADMIN"), controller.flatWiseVisitors);
router.get("/current", protect, allowRoles("ADMIN"), controller.currentVisitors);
router.get("/top-flats", protect, allowRoles("ADMIN"), controller.topVisitedFlats);
router.get("/guard-activity", protect, allowRoles("ADMIN"), controller.guardActivity);

module.exports = router;
