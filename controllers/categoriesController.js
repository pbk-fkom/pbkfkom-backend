const Categories = require("../models/Categories");

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const categories = await Categories.find()
  
        res.render('categories/index',{
          categories,
          alert,
          title: 'Kategori'
        })
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/categories')
        
      }
  },

  create: async (req, res) => {
    try {
        res.render("categories/create", {
            title: "Tambah Kategori",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/categories");
    }
  },

  store: async (req, res) => {
    try {
        const { name } = req.body;
        await Categories.create({ name })

        req.flash("alertMessage", "Berhasil menambahkan kategori");
        req.flash("alertStatus", "success");

        res.redirect("/categories"); 

    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const category = await Categories.findById(id);
         
         res.render("categories/edit", {
            category,
            title: "Edit Kategori",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/categories");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        await Categories.findOneAndUpdate({
            _id: id
          },{ name });
    
        req.flash("alertMessage", "Berhasil mengedit kategori");
        req.flash("alertStatus", "success");
    
        res.redirect("/categories");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Categories.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus kategori");
      req.flash("alertStatus", "success");
      res.redirect("/categories");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const categories = await Categories.find()

      res.status(200).json({ data: categories })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};