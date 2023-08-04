const express = require("express");
const router = express.Router();
const periodeController = require("../controllers/periodeController");
const {
  periodeStore,
  periodeUpdate,
} = require("../validations/periodeValidation");

router.get("/", periodeController.index);
router.get("/create", periodeController.create);
router.get("/:id/edit", periodeController.edit);

router.post("/store", periodeStore, periodeController.store);

router.put("/:id/update", periodeUpdate, periodeController.update);
router.delete("/:id", periodeController.destroy);

// API
router.get("/index", periodeController.indexAPI);
router.get("/latest-periode", periodeController.getLatestPeriodeAPI);

module.exports = router;
