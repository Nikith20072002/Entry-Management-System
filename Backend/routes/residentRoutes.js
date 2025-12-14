const express = require("express");
const router = express.Router();
const controller = require("../controllers/residentController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

router.post(
  "/approve",
  protect,
  allowRoles("RESIDENT"),
  controller.approveVisitor
);

module.exports = router;
