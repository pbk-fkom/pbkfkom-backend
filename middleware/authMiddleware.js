const isLogin = (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash("alertMessage", `Login dulu`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  } else {
    next();
  }
};

const hasRoles = (roles) => {
  return (
    hasRoles[roles] ||
    (hasRoles[roles] = function (req, res, next) {
      var isAllowed = false,
        user = req.session.user;

      roles.forEach(function (role) {
        if (role === user.role) {
          isAllowed = true;
        }
      });

      if (!isAllowed) {
        res.send(403);
      } else {
        next();
      }
    })
  );
};

module.exports = { isLogin, hasRoles };
