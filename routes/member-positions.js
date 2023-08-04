const express = require("express");
const router = express.Router();
const memberPositionsController = require("../controllers/memberPositionsController");
const {
  memberPositionStore,
  memberPositionUpdate,
} = require("../validations/memberPositionsValidation");
const { isLogin } = require("../middleware/authMiddleware");

router.use(isLogin);
router.get("/", memberPositionsController.index);
router.get("/create", memberPositionsController.create);
router.get("/:id/edit", memberPositionsController.edit);

router.post("/store", memberPositionStore, memberPositionsController.store);

router.put(
  "/:id/update",
  memberPositionUpdate,
  memberPositionsController.update
);
router.delete("/:id", memberPositionsController.destroy);

module.exports = router;
