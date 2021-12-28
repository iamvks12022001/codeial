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
        populate: {
          //here as well
          path: "likes",
        },
      })
      .populate("likes"); //here it is

    let users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
