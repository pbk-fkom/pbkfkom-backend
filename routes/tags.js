const express = require('express');
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/", tagsController.index);
router.get("/create", tagsController.create);
router.get("/:id/edit", tagsController.edit);

router.post("/store", tagsController.store);

router.put("/:id/update", tagsController.update);
router.delete("/:id", tagsController.destroy);

// API
router.get("/index", tagsController.indexAPI);

module.exports = router;