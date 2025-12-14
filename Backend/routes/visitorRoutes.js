const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

router.post(
  "/create",
  protect,
  allowRoles("GUARD"),
  controller.createVisitor
);

router.post(
  "/exit",
  protect,
  allowRoles("GUARD"),
  controller.exitVisitor
);

module.exports = router;
