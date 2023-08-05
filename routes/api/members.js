const express = require("express");
const router = express.Router();
const membersController = require("../../controllers/api/membersController");

router.get("/", membersController.index);
router.get("/active", membersController.active);
router.get("/chief", membersController.chief);
router.get("/:id", membersController.show);

module.exports = router;
