const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");
const multer = require("multer");
const {
  memberStore,
  memberUpdate,
} = require("../validations/membersValidation");
const { mkdirp } = require("mkdirp");
const fs = require("fs");

if (!fs.existsSync("public/assets/uploads")) {
  mkdirp("public/assets/uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get("/", membersController.index);
router.get("/create", membersController.create);
router.get("/:id/edit", membersController.edit);

router.post(
  "/store",
  multer().single("photo"),
  memberStore,
  membersController.store
);

router.put(
  "/:id/update",
  multer().single("photo"),
  memberUpdate,
  membersController.update
);
router.delete("/:id", membersController.destroy);

router.get("/import", membersController.import);
router.post("/import", uploads.single("file"), membersController.importStore);

module.exports = router;
