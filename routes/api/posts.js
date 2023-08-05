const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/api/postsController");

router.get("/", postsController.index);
router.get("/:slug", postsController.show);
router.get("/category/:slug", postsController.category);
router.get("/tag/:slug", postsController.tag);

module.exports = router;
