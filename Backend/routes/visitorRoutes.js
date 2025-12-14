const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorController");

router.post("/create", controller.createVisitor);
router.post("/exit", controller.exitVisitor);

module.exports = router;
