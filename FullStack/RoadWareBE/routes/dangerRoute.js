const express = require("express");
const router = express.Router();
const dangerController = require("../controllers/dangerController");

router.post("/level", dangerController.getDangerLevels);

module.exports = router;
