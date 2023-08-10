const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.index);
router.post("/", loginController.login);
router.get("/logout", loginController.logout);

module.exports = router;
