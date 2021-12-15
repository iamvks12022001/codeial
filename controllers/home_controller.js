const Post = require("../models/post");
//getting User schema
const User = require("../models/user");

module.exports.home = async function (req, res) {
  //which declare that it's is async function

  try {
    let posts = await Post.find({}) //telling to wait for it'd complete execution
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    // getting all the user and then passing it to the home page for rendering

    let users = await User.find({}); //waiting till it get all the users

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
