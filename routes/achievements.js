const express = require('express');
const router = express.Router();
const achievementsController = require("../controllers/achievementsController");

router.get("/", achievementsController.index);
router.get("/create", achievementsController.create);
router.get("/:id/edit", achievementsController.edit);

router.post("/store", achievementsController.store);

router.put("/:id/update", achievementsController.update);
router.delete("/:id", achievementsController.destroy);

// API
router.get("/index", achievementsController.indexAPI);

module.exports = router;