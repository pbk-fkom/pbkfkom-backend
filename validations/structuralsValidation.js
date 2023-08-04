const { body } = require("express-validator");

const strukturalStore = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama struktural harus diisi!")
    .isString()
    .withMessage("Nama struktural harus berupa string"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Deskripsi struktural harus diisi!")
    .isString()
    .withMessage("Deskripsi struktural harus berupa string"),
];

const strukturalUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama struktural harus diisi!")
    .isString()
    .withMessage("Nama struktural harus berupa string"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Deskripsi struktural harus diisi!")
    .isString()
    .withMessage("Deskripsi struktural harus berupa string"),
];

module.exports = {
  strukturalStore,
  strukturalUpdate,
};
