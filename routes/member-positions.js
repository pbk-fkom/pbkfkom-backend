const express = require('express');
const router = express.Router();
const memberPositionsController = require("../controllers/memberPositionsController");

router.get("/", memberPositionsController.index);
router.get("/create", memberPositionsController.create);
router.get("/:id/edit", memberPositionsController.edit);

router.post("/store", memberPositionsController.store);

router.put("/:id/update", memberPositionsController.update);
router.delete("/:id", memberPositionsController.destroy);

module.exports = router;