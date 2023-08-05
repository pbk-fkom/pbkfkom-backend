const Settings = require("../../models/Settings");

module.exports = {
  index: async (req, res) => {
    try {
      const settings = await Settings.find();

      res.status(200).json({ data: settings });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
