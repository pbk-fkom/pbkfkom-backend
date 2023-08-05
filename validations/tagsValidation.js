const { body } = require("express-validator");

const tagStore = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama tag harus diisi!")
    .isString()
    .withMessage("Nama tag harus berupa string"),
];

const tagUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama tag harus diisi!")
    .isString()
    .withMessage("Nama tag harus berupa string"),
];

module.exports = {
  tagStore,
  tagUpdate,
};
