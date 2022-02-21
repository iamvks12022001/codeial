const Post = require("../models/post");

const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    //changes ::populate the likes of each post and comments
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
      }) //changing here
      .populate("likes");
    //here it is
    let user = "";
    if (req.user) {
      user = await User.findById(req.user.id).populate("friends", "name");
    }
    let users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
      user: user,
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
