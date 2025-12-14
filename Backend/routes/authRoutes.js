const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/guard/login", auth.guardLogin);

module.exports = router;
