const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { isLogin } = require("../middleware/authMiddleware");

router.use(isLogin);
router.get("/", dashboardController.index);

module.exports = router;
