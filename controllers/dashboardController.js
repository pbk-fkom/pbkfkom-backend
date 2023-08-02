module.exports = {
  index: async (req, res) => {
    try {
        res.render('dashboard/index', {
            title: 'Dashboard'
          })
    } catch (err) {
        console.log(err)
    }
  },
};