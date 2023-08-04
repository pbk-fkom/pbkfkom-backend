const Achievements = require("../../models/Achievements");

module.exports = {
  index: async (req, res) => {
    try {
      const achievements = await Achievements.find().sort({ _id: -1 });

      res.status(200).json({ data: achievements });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
