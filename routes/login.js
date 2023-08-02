const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/secret", loginController.index);
router.post("/secret", loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;