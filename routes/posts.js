const express = require('express');
const router = express.Router();
const postsController = require("../controllers/postsController");
const multer = require('multer')
const os = require('os')

router.get("/", postsController.index);
router.get("/create", postsController.create);
router.get("/:id/edit", postsController.edit);

router.post("/store", multer({ dest: os.tmpdir() }).single('thumbnail'), postsController.store);

router.put("/:id/update", multer({ dest: os.tmpdir() }).single('thumbnail'), postsController.update);
router.delete("/:id", postsController.destroy);

// API
router.get("/index", postsController.indexAPI);
router.get('/detail/:slug', postsController.detailAPI);

module.exports = router;