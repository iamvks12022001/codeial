const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content, //actualle content
        post: req.body.post, //asically post id
        user: req.user._id, //jisne comment kiya ha uska id
      });
      post.comments.push(comment);
      post.save();

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

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};
