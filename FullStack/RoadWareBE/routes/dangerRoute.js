<<<<<<< HEAD:FullStack/RoadWareBE/routes/dangerRoute.js
const express = require("express");
const router = express.Router();
const dangerController = require("../controllers/dangerController");
router.post("/level", dangerController.getDangerLevels);

module.exports = router;
=======
const express = require("express");
const router = express.Router();

const dangerController = require("../controllers/postController");

router.post("/level", dangerController.getDangerLevels);

module.exports = router;
>>>>>>> origin/server-update:FullStack/RoadWareBE/routes/postRoute.js
