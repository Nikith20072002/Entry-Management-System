const express = require("express");
const router = express.Router();
const controller = require("../controllers/qrController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

router.post(
  "/generate",
  protect,
  allowRoles("RESIDENT"),
  controller.createQR
);

router.post(
  "/scan",
  protect,
  allowRoles("GUARD"),
  controller.validateQR
);

module.exports = router;
