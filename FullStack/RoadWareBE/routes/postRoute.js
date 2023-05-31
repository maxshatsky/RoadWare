const express = require("express");
const router = express.Router();
const dangerController = require("../controllers/postController");

router.get("/level", dangerController.getDangerLevels);

module.exports = router;
