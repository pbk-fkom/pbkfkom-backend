const Periode = require("../../models/Periode");

module.exports = {
  index: async (req, res) => {
    try {
      const periode = await Periode.find().sort({ _id: -1 });

      res.status(200).json({ data: periode });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  latest: async (req, res) => {
    try {
      const periode = await Periode.findOne().sort({ _id: -1 });

      res.status(200).json({ data: periode });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
