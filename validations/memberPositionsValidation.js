const { body } = require("express-validator");

const memberPositionStore = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama jabatan pengurus harus diisi!")
    .isString()
    .withMessage("Nama jabatan pengurus harus berupa string"),
];

const memberPositionUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama jabatan pengurus harus diisi!")
    .isString()
    .withMessage("Nama jabatan pengurus harus berupa string"),
];

module.exports = {
  memberPositionStore,
  memberPositionUpdate,
};
