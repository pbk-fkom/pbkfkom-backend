const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const multer = require("multer");
const os = require("os");
const { postStore, postUpdate } = require("../validations/postsValidation");
const { isLogin } = require("../middleware/authMiddleware");

router.use(isLogin);
router.get("/", postsController.index);
router.get("/create", postsController.create);
router.get("/:id/edit", postsController.edit);

router.post(
  "/store",
  multer({ dest: os.tmpdir() }).single("thumbnail"),
  postStore,
  postsController.store
);

router.put(
  "/:id/update",
  multer({ dest: os.tmpdir() }).single("thumbnail"),
  postUpdate,
  postsController.update
);
router.delete("/:id", postsController.destroy);

// API
router.get("/index", postsController.indexAPI);
router.get("/detail/:slug", postsController.detailAPI);

module.exports = router;
