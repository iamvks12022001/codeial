const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("/");
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile" + req.user.id); // fixing the profile link issues
  }
  return res.render("user_sign_up", {
    title: "iCoder | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile" + req.user.id);
  }

  return res.render("user_sign_in", {
    title: "iCoder | Sign In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("eror in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("eror in Creating user in signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
// sign in that is create the session

module.exports.createSesion = function (req, res) {
  return res.redirect("/users/profile/" + req.user.id); //to redirect to profile page
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};
