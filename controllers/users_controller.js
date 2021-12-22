const User = require("../models/user");
//module required to delete the file
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

//converting it to asyn function
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*** MUTLER ERROR", err);
        }

        //  console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          //if profile pic is already avl then delete that pic
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          //above line of code give error whenwe upload pic for 1st time--so for that just uncomment tose line
          //this is saving the path of the uploaded file into the avatar field of user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorised");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile" + req.user.id);
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

module.exports.createSesion = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/users/profile/" + req.user.id); //to redirect to profile page
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You have logged Out");
  return res.redirect("/");
};
