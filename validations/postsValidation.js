const { body } = require("express-validator");

const postStore = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Judul harus diisi!")
    .isString()
    .withMessage("Judul harus berupa string"),
  body("content")
    .exists({ checkFalsy: true })
    .withMessage("Konten harus diisi!")
    .isString()
    .withMessage("Konten harus berupa string"),
  body("tags").isArray().withMessage("Tag harus berupa kumpulan data"),
  body("category")
    .isMongoId()
    .withMessage("Kategori harus diisi!")
    .isString()
    .withMessage("Kategori harus berupa string"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status harus diisi!")
    .isIn(["publish", "draft"])
    .withMessage("Status yang dipilih tidak diperbolehkan")
    .isString()
    .withMessage("Status harus berupa string"),
  body("writer")
    .exists({ checkFalsy: true })
    .withMessage("Nama penulis harus diisi!")
    .isString()
    .withMessage("Nama penulis harus berupa string"),
];

const postUpdate = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Judul harus diisi!")
    .isString()
    .withMessage("Judul harus berupa string"),
  body("content")
    .exists({ checkFalsy: true })
    .withMessage("Konten harus diisi!")
    .isString()
    .withMessage("Konten harus berupa string"),
  body("tags").isArray().withMessage("Tag harus berupa kumpulan data"),
  body("category")
    .isMongoId()
    .withMessage("Kategori harus diisi!")
    .isString()
    .withMessage("Kategori harus berupa string"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status harus diisi!")
    .isIn(["publish", "draft"])
    .withMessage("Status yang dipilih tidak diperbolehkan")
    .isString()
    .withMessage("Status harus berupa string"),
  body("writer")
    .exists({ checkFalsy: true })
    .withMessage("Nama penulis harus diisi!")
    .isString()
    .withMessage("Nama penulis harus berupa string"),
];

module.exports = {
  postStore,
  postUpdate,
};
