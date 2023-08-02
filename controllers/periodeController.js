const Periode = require("../models/Periode");

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const periode = await Periode.find()
  
        res.render('periode/index',{
          periode,
          alert,
          title: 'Periode'
        })
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/periode')
        
      }
  },

  create: async (req, res) => {
    try {
        res.render("periode/create", {
            title: "Tambah Periode",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/periode");
    }
  },

  store: async (req, res) => {
    try {
        const { name, tagline, periode_year } = req.body;
        await Periode.create({ name, tagline, periode_year })

        req.flash("alertMessage", "Berhasil menambahkan periode");
        req.flash("alertStatus", "success");

        res.redirect("/periode"); 

    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const periode = await Periode.findById(id);
         
         res.render("periode/edit", {
            periode,
            title: "Edit Periode",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/periode");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tagline, periode_year } = req.body;

        await Periode.findOneAndUpdate({
            _id: id
          },{ name, tagline, periode_year });
    
        req.flash("alertMessage", "Berhasil mengedit periode");
        req.flash("alertStatus", "success");
    
        res.redirect("/periode");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Periode.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus periode");
      req.flash("alertStatus", "success");
      res.redirect("/periode");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  indexAPI: async (req, res) => {
    try {
      const periode = await Periode.find().sort({'_id':-1})

      res.status(200).json({ data: periode })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  getLatestPeriodeAPI: async (req, res) => {
    try {
      const periode = await Periode.find().sort({'_id':-1}).limit(1)

      res.status(200).json({ data: periode })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};