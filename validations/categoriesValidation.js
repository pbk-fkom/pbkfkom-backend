const { body } = require("express-validator");

const categoryStore = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama kategori harus diisi!")
    .isString()
    .withMessage("Nama kategori harus berupa string"),
];

const categoryUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama kategori harus diisi!")
    .isString()
    .withMessage("Nama kategori harus berupa string"),
];

module.exports = {
  categoryStore,
  categoryUpdate,
};
