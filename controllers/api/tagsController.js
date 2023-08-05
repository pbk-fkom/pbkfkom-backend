const Tags = require("../../models/Tags");

module.exports = {
  index: async (req, res) => {
    try {
      const tags = await Tags.find();

      res.status(200).json({ data: tags });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
