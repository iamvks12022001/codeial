const Post = require("../models/post");
//getting User schema
const User = require("../models/user");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      // getting all the user and then passing it to the home page for rendering

      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
