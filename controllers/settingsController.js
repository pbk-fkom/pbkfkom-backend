const Settings = require("../models/Settings");
const path = require('path')
const fs = require('fs')
const config = require('../config')

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const setting = await Settings.find()
  
        res.render('settings/index',{
          setting,
          alert,
          title: 'Pengaturan'
        })
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/settings')
        
      }
  },

  update: async (req, res) => {
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/about/${filename}`)
  
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
  
            src.pipe(dest)
  
            src.on('end', async ()=>{
            try {
                const setting = await Settings.findOne({key: "about_photo"})

                let currentImage = `${config.rootPath}/public/about/${setting.value}`;
                if(fs.existsSync(currentImage)){
                  fs.unlinkSync(currentImage)
                }
  
                await Settings.findOneAndUpdate({
                    key: 'about_photo'
                  },{ value: filename });
  
                req.flash('alertMessage', "Berhasil mengedit pengaturan")
                req.flash('alertStatus', "success")
        
                res.redirect('/settings')
                
            } catch (err) {
                req.flash('alertMessage', `${err.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/settings')
            }
            })
        } else {
            const settings = await Settings.find();

            settings.forEach((item) => {
                console.log(item)
            })
            
            req.flash('alertMessage', "Berhasil mengedit pengaturan")
            req.flash('alertStatus', "success")
            
            res.redirect('/settings')
        }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/settings");
    }
  },

   // API Controller
   indexAPI: async (req, res) => {
    try {
      const settings = await Settings.find()

      res.status(200).json({ data: settings })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};