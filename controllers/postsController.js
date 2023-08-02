const Posts = require("../models/Posts");
const Categories = require("../models/Categories");
const Tags = require("../models/Tags");
const path = require('path')
const fs = require('fs')
const config = require('../config')

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const posts = await Posts.find().populate(["categoryId", "tagId", "userId"]);
  
        res.render('posts/index',{
          posts,
          alert,
          title: 'Artikel'
        })
      } catch (err) {
        console.log(err)
      }
  },

  create: async (req, res) => {
    try {
        const categories = await Categories.find();
        const tags = await Tags.find();

        res.render("posts/create", {
            categories,
            tags,
            title: "Tambah Artikel",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/posts");
    }
  },

  store: async (req, res) => {
    try {
        const { title, content, tags, category, writer } = req.body;

        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/thumbnails/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)

            src.on('end', async ()=>{
            try {

                const post = new Posts({
                    title,
                    content,
                    categoryId: category,
                    tagId: tags,
                    writer,
                    userId: "64c395105c431d8409248e9c",
                    thumbnail: filename
                })

                await post.save();

                req.flash('alertMessage', "Berhasil menambahkan artikel")
                req.flash('alertStatus', "success")
        
                res.redirect('/posts')
                
            } catch (err) {
                req.flash('alertMessage', `${err.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/posts')
            }
            })
        } else {
            req.flash("alertMessage", "Pilih thumbnail");
            req.flash("alertStatus", "danger");
      
            res.redirect("/posts");
        }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const post = await Posts.findById(id).populate(["categoryId", "tagId", "userId"]);;
         const categories = await Categories.find();
         const tags = await Tags.find();
         
         res.render("posts/edit", {
            post,
            categories,
            tags,
            title: "Edit Artikel",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/posts");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, category, writer } = req.body;
    
        if(req.file){
          let tmp_path= req.file.path;
          let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
          let filename = req.file.filename + '.' + originaExt;
          let target_path = path.resolve(config.rootPath, `public/thumbnails/${filename}`)

          const src = fs.createReadStream(tmp_path)
          const dest = fs.createWriteStream(target_path)

          src.pipe(dest)

          src.on('end', async ()=>{
          try {

              const post = await Posts.findOne({_id: id})

              let currentImage = `${config.rootPath}/public/thumbnails/${post.thumbnail}`;
              if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
              }

              await Posts.findOneAndUpdate({
                  _id : id
                },{
                  title,
                  content,
                  categoryId: category,
                  tagId: tags,
                  writer,
                  userId: "64c395105c431d8409248e9c",
                  thumbnail: filename
                })

              req.flash('alertMessage', "Berhasil mengedit artikel")
              req.flash('alertStatus', "success")
      
              res.redirect('/posts')
              
          } catch (err) {
              req.flash('alertMessage', `${err.message}`)
              req.flash('alertStatus', 'danger')
              res.redirect('/posts')
          }
          })
      } else {
          await Posts.findOneAndUpdate({
              _id : id
            },{
              title,
              content,
              categoryId: category,
              tagId: tags,
              writer,
              userId: "64c395105c431d8409248e9c"
            })
            
            req.flash('alertMessage', "Berhasil mengedit artikel")
            req.flash('alertStatus', "success")
      
            res.redirect('/posts')
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Posts.findOneAndRemove({
        _id: id
      });

      let currentImage = `${config.rootPath}/public/thumbnails/${post.thumbnail}`;
      if(fs.existsSync(currentImage)){
        fs.unlinkSync(currentImage)
      }

      req.flash("alertMessage", "Berhasil menghapus artikel");
      req.flash("alertStatus", "success");
      res.redirect("/posts");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const posts = await Posts.find().sort({'_id':-1}).populate("categoryId")

      res.status(200).json({ data: posts })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  detailAPI: async (req, res) => {
    try {
      const { slug } = req.params
      const post = await Posts.findOne({ slug: slug }).populate('tagId')

      if (!post) {
        return res.status(404).json({ message: "Artikel tidak ditemukan.!" })
      }

      res.status(200).json(post)

    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },
};