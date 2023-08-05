const express = require("express");
const router = express.Router();
const structuralsController = require("../../controllers/api/structuralsController");

router.get("/", structuralsController.index);

module.exports = router;
