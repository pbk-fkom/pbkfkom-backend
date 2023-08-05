const Categories = require("../../models/Categories");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Categories.find();

      res.status(200).json({ data: categories });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
