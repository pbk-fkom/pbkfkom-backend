const express = require("express");
const router = express.Router();
const achievementsController = require("../../controllers/api/achievementsController");

router.get("/", achievementsController.index);

module.exports = router;
