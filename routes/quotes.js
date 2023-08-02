const express = require('express');
const router = express.Router();
const quotesController = require("../controllers/quotesController");

router.get("/", quotesController.index);
router.get("/create", quotesController.create);
router.get("/:id/edit", quotesController.edit);

router.post("/store", quotesController.store);

router.put("/:id/update", quotesController.update);
router.delete("/:id", quotesController.destroy);

// API
router.get("/index", quotesController.indexAPI);
router.get("/quote", quotesController.quoteAPI);

module.exports = router;