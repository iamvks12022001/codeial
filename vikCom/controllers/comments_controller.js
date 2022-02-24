const Comment = require("../models/comment");
const Post = require("../models/post");
//import like
const Like = require("../models/like");

const commentMailer = require("../mailers/comments_mailer");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email").execPopulate();

      // commentMailer.newComment(comment);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment published!");

      res.redirect("/");
    }
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};

//deleting a comment
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    let postId = comment.post;
    let post = await Post.findById(postId);

    let userId = post.user;
    if (post.user == req.user.id || comment.user == req.user.id) {
      comment.remove();
      let postId = comment.post;
      Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      //changes :: delete the associated likes for the comments
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Comment deleted!");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};
