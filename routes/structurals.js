const express = require('express');
const router = express.Router();
const structuralsController = require("../controllers/structuralsController");

router.get("/", structuralsController.index);
router.get("/create", structuralsController.create);
router.get("/:id/edit", structuralsController.edit);

router.post("/store", structuralsController.store);

router.put("/:id/update", structuralsController.update);
router.delete("/:id", structuralsController.destroy);

// API
router.get("/index", structuralsController.indexAPI);

module.exports = router;