const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const multer = require("multer");
const { postStore, postUpdate } = require("../validations/postsValidation");

router.get("/", postsController.index);
router.get("/create", postsController.create);
router.get("/:id/edit", postsController.edit);

router.post(
  "/store",
  multer().single("thumbnail"),
  postStore,
  postsController.store
);

router.put(
  "/:id/update",
  multer().single("thumbnail"),
  postUpdate,
  postsController.update
);
router.delete("/:id", postsController.destroy);

module.exports = router;
