const Quotes = require("../../models/Quotes");

module.exports = {
  index: async (req, res) => {
    try {
      const quotes = await Quotes.find()
        .sort({ _id: -1 })
        .populate("memberId memberPositionId periodeId");

      res.status(200).json({ data: quotes });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  chief: async (req, res) => {
    try {
      const quote = await Quotes.findOne()
        .sort({ _id: -1 })
        .limit(1)
        .populate("memberId memberPositionId periodeId");

      res.status(200).json({ data: quote });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
