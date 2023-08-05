const Structurals = require("../../models/Structurals");

module.exports = {
  index: async (req, res) => {
    try {
      const structurals = await Structurals.find().select(
        "name slug description"
      );

      res.status(200).json({ data: structurals });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
