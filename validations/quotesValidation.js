const { body } = require("express-validator");

const quoteStore = [
  body("member").isMongoId().withMessage("Nama ketum harus diisi!"),
  body("content")
    .exists({ checkFalsy: true })
    .withMessage("Konten harus diisi!")
    .isString()
    .withMessage("Konten harus berupa string"),
];

const quoteUpdate = [
  body("member").isMongoId().withMessage("Nama ketum harus diisi!"),
  body("content")
    .exists({ checkFalsy: true })
    .withMessage("Konten harus diisi!")
    .isString()
    .withMessage("Konten harus berupa string"),
];

module.exports = {
  quoteStore,
  quoteUpdate,
};
