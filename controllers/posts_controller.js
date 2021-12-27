const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate("user", "name").execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "post created !",
      });
    }
    req.flash("success", "Post published");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      //it will get the post from home_poage.js from js file
      //and send to the local
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post deleted !",
        });
      }
      req.flash("success", "Post associated comments deleted !!");
      return res.redirect("back");
    } else {
      req.flash("eror", "you cannot delete this post");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("eror", error);
    return res.redirect("back");
  }
};
