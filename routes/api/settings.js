const express = require("express");
const router = express.Router();
const settingsController = require("../../controllers/api/settingsController");

router.get("/", settingsController.index);

module.exports = router;
