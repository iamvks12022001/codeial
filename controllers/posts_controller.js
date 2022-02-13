const Post = require("../models/post");
const Comment = require("../models/comment");
//import like
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id, //ye  kha se aya
    });

    if (req.xhr) {
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
    // console.log("req des", req);
    //params me id aa jaegi as we use get
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      //changes :: delete the associated likes for the post and all its comments'likes too
      await Like.deleteMany({ likeable: post._id, onModel: "Post" });
      await Like.deleteMany({ likeable: { $in: post.comments } });

      post.remove();

      await Comment.deleteMany({ post: req.params.id });

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
