const User = require("../models/user"); // to accquire user schema

module.exports.profile = function (req, res) {
  // by this profile page info only can be seen if user is sign in already
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        //if we find the user in DB
        return res.render("profile", {
          title: "User Profile",
          user: user,
        });
      }
      //unauthorized to access
      else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "iCoder | Sign Up",
  });
};
//render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "iCoder | Sign In",
  });
};
// get the sign up data

module.exports.create = function (req, res) {
  // if password and confirm password are different
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  // to check whether this email is avl or not
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
        return res.redirect("/users/sign-in"); // just for know for checking
      });
    } else {
      return res.redirect("back");
    }
  });
};
// sign in that is create the session

module.exports.createSesion = function (req, res) {
  // steps to authenticate
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("eror in Creating user in signing in");
      return;
    }
    //handle user found
    if (user) {
      //handle password if not matched
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle if password matched ans session created
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};

// for sign out
module.exports.destroySession = function (req, res) {
  //delete the cookie

  res.clearCookie("user_id");

  //return back to signin page
  return res.redirect("/users/sign-in");
};
