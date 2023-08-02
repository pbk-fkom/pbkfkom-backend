const Quotes = require("../models/Quotes");
const Members = require("../models/Members");

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const quotes = await Quotes.find().populate("memberId")
  
        res.render('quotes/index',{
          quotes,
          alert,
          title: 'Kutipan'
        })
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/quotes')
        
      }
  },

  create: async (req, res) => {
    try {
        let members = await Members.find().populate("memberPositionId")
        members = members.filter(member => member.memberPositionId.name == "Ketua Umum")

        res.render("quotes/create", {
            members,
            title: "Tambah Kutipan",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/quotes");
    }
  },

  store: async (req, res) => {
    try {
        let memberPosition, periode
        const { member, content } = req.body;
        const getMember = await Members.find({_id: member})
        
        getMember.forEach((item) => {
            memberPosition = item.memberPositionId
            periode = item.periodeId
        })

        await Quotes.create({ 
            memberId: member, 
            memberPositionId: memberPosition, 
            periodeId: periode, 
            content
        })

        req.flash("alertMessage", "Berhasil menambahkan kutipan");
        req.flash("alertStatus", "success");

        res.redirect("/quotes"); 
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/quotes");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const quotes = await Quotes.findById(id);
         let members = await Members.find().populate("memberPositionId")
         members = members.filter(member => member.memberPositionId.name == "Ketua Umum")
         
         res.render("quotes/edit", {
            members,
            quotes,
            title: "Edit Kutipan",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/quotes");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { member, content } = req.body;

        await Quotes.findOneAndUpdate({
            _id: id
          },{ memberId: member, content });
    
        req.flash("alertMessage", "Berhasil mengedit kutipan");
        req.flash("alertStatus", "success");
    
        res.redirect("/quotes");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/quotes");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Quotes.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus kutipan");
      req.flash("alertStatus", "success");
      res.redirect("/quotes");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/quotes");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const quotes = await Quotes.find().sort({'_id':-1}).populate("memberId memberPositionId periodeId")

      res.status(200).json({ data: quotes })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  quoteAPI: async (req, res) => {
    try {
      const quote = await Quotes.find().sort({'_id':-1}).limit(1).populate("memberId memberPositionId periodeId")

      res.status(200).json({ data: quote })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};