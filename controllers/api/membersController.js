const Members = require("../../models/Members");
const Periode = require("../../models/Periode");
const MemberPositions = require("../../models/MemberPositions");

module.exports = {
  index: async (req, res) => {
    try {
      const members = await Members.find().populate(
        "memberPositionId structuralId periodeId"
      );

      res.status(200).json({ data: members });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const member = await Members.findOne({ _id: id }).populate(
        "memberPositionId structuralId periodeId"
      );

      res.status(200).json(member);
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  active: async (req, res) => {
    try {
      const periode = await Periode.findOne().sort({ _id: -1 }).limit(1);
      const members = await Members.find({
        periodeId: periode._id,
      }).populate("memberPositionId structuralId");

      res.status(200).json({ data: members });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  chief: async (req, res) => {
    try {
      const periode = await Periode.findOne().sort({ _id: -1 }).limit(1);
      const memberPositions = await MemberPositions.findOne({
        name: "Ketua Umum",
      })
        .sort({ _id: -1 })
        .limit(1);

      const member = await Members.findOne({
        periodeId: periode._id,
        memberPositionId: memberPositions._id,
      }).populate("memberPositionId structuralId");

      res.status(200).json({ data: member });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
