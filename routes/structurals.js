const express = require("express");
const router = express.Router();
const structuralsController = require("../controllers/structuralsController");
const {
  strukturalStore,
  strukturalUpdate,
} = require("../validations/structuralsValidation");

router.get("/", structuralsController.index);
router.get("/create", structuralsController.create);
router.get("/:id/edit", structuralsController.edit);

router.post("/store", strukturalStore, structuralsController.store);

router.put("/:id/update", strukturalUpdate, structuralsController.update);
router.delete("/:id", structuralsController.destroy);

// API
router.get("/index", structuralsController.indexAPI);

module.exports = router;
