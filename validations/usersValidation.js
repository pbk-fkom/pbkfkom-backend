const { body } = require("express-validator");

const userUpdate = [
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username harus diisi!")
    .isString()
    .withMessage("Username harus berupa string"),
  body("password")
    .optional({ nullable: true })
    .isString()
    .withMessage("Password harus berupa string"),
];

module.exports = userUpdate;
