const express = require("express");
const router = express.Router();
const controller = require("../controllers/residentController");

router.post("/approve", controller.approveVisitor);

module.exports = router;
