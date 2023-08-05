const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userUpdate = require("../validations/usersValidation");

router.get("/", usersController.index);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", userUpdate, usersController.update);

module.exports = router;
