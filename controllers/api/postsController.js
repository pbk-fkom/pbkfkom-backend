const Posts = require("../../models/Posts");
const Categories = require("../../models/Categories");
const Tags = require("../../models/Tags");

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Posts.find().sort({ _id: -1 }).populate("categoryId");

      res.status(200).json({ data: posts });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  show: async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await Posts.findOne({ slug: slug }).populate("tagId");

      if (!post) {
        return res
          .status(404)
          .json({ code: 404, message: "Artikel tidak ditemukan.!" });
      }

      res.status(200).json({ data: post });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  category: async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await Categories.findOne({ slug: slug });

      if (!category) {
        return res
          .status(404)
          .json({ code: 404, message: "Kategori artikel tidak ditemukan.!" });
      }

      const posts = await Posts.find({ categoryId: category._id })
        .sort({ _id: -1 })
        .populate("categoryId");

      res.status(200).json({ category: category, data: posts });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  tag: async (req, res) => {
    try {
      const { slug } = req.params;
      const tag = await Tags.findOne({ slug: slug });

      if (!tag) {
        return res
          .status(404)
          .json({ code: 404, message: "Tag artikel tidak ditemukan.!" });
      }

      const posts = await Posts.find({ tagId: tag._id })
        .sort({ _id: -1 })
        .populate("categoryId");

      res.status(200).json({ tag: tag, data: posts });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
