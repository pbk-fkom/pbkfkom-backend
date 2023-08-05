const { body } = require("express-validator");

const memberStore = [
  body("nim")
    .exists({ checkFalsy: true })
    .withMessage("NIM harus diisi!")
    .isInt()
    .withMessage("NIM harus berupa angka"),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama pengurus harus diisi!")
    .isString()
    .withMessage("Nama pengurus harus berupa string"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email harus diisi!")
    .isEmail()
    .withMessage("Email harus berupa email"),
  body("classes")
    .exists({ checkFalsy: true })
    .withMessage("Kelas harus diisi!")
    .isString()
    .withMessage("Kelas harus berupa string"),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Jenis kelamin harus diisi!")
    .isIn(["Laki-Laki", "Perempuan"])
    .withMessage("Jenis kelamin yang dipilih tidak diperbolehkan")
    .isString()
    .withMessage("Jenis kelamin harus berupa string"),
  body("phone")
    .exists({ checkFalsy: true })
    .withMessage("Nomor whatsapp harus diisi!")
    .isInt()
    .withMessage("Nomor whatsapp harus berupa angka"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Alamat harus diisi!")
    .isString()
    .withMessage("Alamat harus berupa string"),
  body("instagram")
    .exists({ checkFalsy: true })
    .withMessage("Username instagram harus diisi!")
    .isString()
    .withMessage("Username instagram harus berupa string"),
  body("member_position")
    .isMongoId()
    .withMessage("Jabatan pengurus harus diisi!")
    .isString()
    .withMessage("Jabatan pengurus harus berupa string"),
  body("structural")
    .isMongoId()
    .withMessage("Struktural pengurus harus diisi!")
    .isString()
    .withMessage("Struktural pengurus harus berupa string"),
  body("periode")
    .isMongoId()
    .withMessage("Periode harus diisi!")
    .isString()
    .withMessage("Periode harus berupa string"),
];

const memberUpdate = [
  body("nim")
    .exists({ checkFalsy: true })
    .withMessage("NIM harus diisi!")
    .isInt()
    .withMessage("NIM harus berupa angka"),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Nama pengurus harus diisi!")
    .isString()
    .withMessage("Nama pengurus harus berupa string"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email harus diisi!")
    .isEmail()
    .withMessage("Email harus berupa email"),
  body("classes")
    .exists({ checkFalsy: true })
    .withMessage("Kelas harus diisi!")
    .isString()
    .withMessage("Kelas harus berupa string"),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Jenis kelamin harus diisi!")
    .isIn(["Laki-Laki", "Perempuan"])
    .withMessage("Jenis kelamin yang dipilih tidak diperbolehkan")
    .isString()
    .withMessage("Jenis kelamin harus berupa string"),
  body("phone")
    .exists({ checkFalsy: true })
    .withMessage("Nomor whatsapp harus diisi!")
    .isInt()
    .withMessage("Nomor whatsapp harus berupa angka"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Alamat harus diisi!")
    .isString()
    .withMessage("Alamat harus berupa string"),
  body("instagram")
    .exists({ checkFalsy: true })
    .withMessage("Username instagram harus diisi!")
    .isString()
    .withMessage("Username instagram harus berupa string"),
  body("member_position")
    .isMongoId()
    .withMessage("Jabatan pengurus harus diisi!")
    .isString()
    .withMessage("Jabatan pengurus harus berupa string"),
  body("structural")
    .isMongoId()
    .withMessage("Struktural pengurus harus diisi!")
    .isString()
    .withMessage("Struktural pengurus harus berupa string"),
  body("periode")
    .isMongoId()
    .withMessage("Periode harus diisi!")
    .isString()
    .withMessage("Periode harus berupa string"),
];

module.exports = {
  memberStore,
  memberUpdate,
};
