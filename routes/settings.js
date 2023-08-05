const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const multer = require("multer");
const os = require("os");

router.get("/", settingsController.index);
router.put(
  "/update",
  multer({ dest: os.tmpdir() }).single("site_about_photo"),
  settingsController.update
);

module.exports = router;
