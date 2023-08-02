const Structurals = require("../models/Structurals");

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const structurals = await Structurals.find()
  
        res.render('structurals/index',{
          structurals,
          alert,
          title: 'Struktural'
        })
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/structurals')
        
      }
  },

  create: async (req, res) => {
    try {
        res.render("structurals/create", {
            title: "Tambah Struktural",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/structurals");
    }
  },

  store: async (req, res) => {
    try {
        const { name, description } = req.body;
        await Structurals.create({ name, description })

        req.flash("alertMessage", "Berhasil menambahkan struktural");
        req.flash("alertStatus", "success");

        res.redirect("/structurals"); 

    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const structural = await Structurals.findById(id);
         
         res.render("structurals/edit", {
            structural,
            title: "Edit Struktural",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/structurals");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        await Structurals.findOneAndUpdate({
            _id: id
          },{ name, description });
    
        req.flash("alertMessage", "Berhasil mengedit struktural");
        req.flash("alertStatus", "success");
    
        res.redirect("/structurals");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Structurals.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus struktural");
      req.flash("alertStatus", "success");
      res.redirect("/structurals");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const structurals = await Structurals.find().select('name slug description')

      res.status(200).json({ data: structurals })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};