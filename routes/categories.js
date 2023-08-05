const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const {
  categoryStore,
  categoryUpdate,
} = require("../validations/categoriesValidation");

router.get("/", categoriesController.index);
router.get("/create", categoriesController.create);
router.get("/:id/edit", categoriesController.edit);

router.post("/store", categoryStore, categoriesController.store);

router.put("/:id/update", categoryUpdate, categoriesController.update);
router.delete("/:id", categoriesController.destroy);

module.exports = router;
