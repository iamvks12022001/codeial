const User = require("../models/user");

module.exports.profile = function (req, res) {
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (user) {
  //       return res.render("profile", {
  //         title: "User Profile",
  //         user: user,
  //       });
  //     } else {
  //       return res.redirect("/users/sign-in");
  //     }
  //   });
  // } else {
  //   return res.redirect("/users/sign-in");
  // }
  return res.render("profile", {
    title: "User Profile",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "iCoder | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
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
  return res.redirect("/"); //to redirect to home page
};

module.exports.destroySession = function (req, res) {
  res.clearCookie("user_id");

  return res.redirect("/users/sign-in");
};
