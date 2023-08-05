const { body } = require("express-validator");

const achievementStore = [
  body("activity_name")
    .exists({ checkFalsy: true })
    .withMessage("Nama kegiatan harus diisi!")
    .isString()
    .withMessage("Nama kegiatan harus berupa string"),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama peserta harus diisi!")
    .isString()
    .withMessage("Nama peserta harus berupa string"),
  body("rank")
    .exists({ checkFalsy: true })
    .withMessage("Peringkat harus diisi!")
    .isString()
    .withMessage("Peringkat harus berupa string"),
  body("year")
    .exists({ checkFalsy: true })
    .withMessage("Tahun harus diisi!")
    .isString()
    .withMessage("Tahun harus berupa string"),
];

const achievementUpdate = [
  body("activity_name")
    .exists({ checkFalsy: true })
    .withMessage("Nama kegiatan harus diisi!")
    .isString()
    .withMessage("Nama kegiatan harus berupa string"),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama peserta harus diisi!")
    .isString()
    .withMessage("Nama peserta harus berupa string"),
  body("rank")
    .exists({ checkFalsy: true })
    .withMessage("Peringkat harus diisi!")
    .isString()
    .withMessage("Peringkat harus berupa string"),
  body("year")
    .exists({ checkFalsy: true })
    .withMessage("Tahun harus diisi!")
    .isString()
    .withMessage("Tahun harus berupa string"),
];

module.exports = {
  achievementStore,
  achievementUpdate,
};
