const { body } = require("express-validator");

const periodeStore = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama periode harus diisi!")
    .isString()
    .withMessage("Nama periode harus berupa string"),
  body("tagline")
    .exists({ checkFalsy: true })
    .withMessage("Tagline kategori harus diisi!")
    .isString()
    .withMessage("Tagline kategori harus berupa string"),
  body("periode_year")
    .exists({ checkFalsy: true })
    .withMessage("Tahun periode harus diisi!")
    .isString()
    .withMessage("Tahun periode harus berupa string"),
];

const periodeUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama periode harus diisi!")
    .isString()
    .withMessage("Nama periode harus berupa string"),
  body("tagline")
    .exists({ checkFalsy: true })
    .withMessage("Tagline kategori harus diisi!")
    .isString()
    .withMessage("Tagline kategori harus berupa string"),
  body("periode_year")
    .exists({ checkFalsy: true })
    .withMessage("Tahun periode harus diisi!")
    .isString()
    .withMessage("Tahun periode harus berupa string"),
];

module.exports = {
  periodeStore,
  periodeUpdate,
};
