const express = require('express');
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.index);
router.get("/create", categoriesController.create);
router.get("/:id/edit", categoriesController.edit);

router.post("/store", categoriesController.store);

router.put("/:id/update", categoriesController.update);
router.delete("/:id", categoriesController.destroy);

// API
router.get("/index", categoriesController.indexAPI);

module.exports = router;