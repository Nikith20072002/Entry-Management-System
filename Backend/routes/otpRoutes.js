const express = require("express");
const router = express.Router();
const controller = require("../controllers/otpController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

router.post(
  "/verify",
  protect,
  allowRoles("RESIDENT"),
  controller.verifyOtp
);

module.exports = router;
