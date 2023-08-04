const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const multer = require("multer");
const os = require("os");
const { isLogin } = require("../middleware/authMiddleware");

router.use(isLogin);
router.get("/", settingsController.index);
router.put(
  "/update",
  multer({ dest: os.tmpdir() }).single("site_about_photo"),
  settingsController.update
);

module.exports = router;
