const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.index);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update);

module.exports = router;