const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotesController");
const { quoteStore, quoteUpdate } = require("../validations/quotesValidation");

router.get("/", quotesController.index);
router.get("/create", quotesController.create);
router.get("/:id/edit", quotesController.edit);

router.post("/store", quoteStore, quotesController.store);

router.put("/:id/update", quoteUpdate, quotesController.update);
router.delete("/:id", quotesController.destroy);

module.exports = router;
