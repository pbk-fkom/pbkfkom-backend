const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const multer = require("multer");

router.get("/", settingsController.index);
router.put(
  "/update",
  multer().single("site_about_photo"),
  settingsController.update
);

module.exports = router;
