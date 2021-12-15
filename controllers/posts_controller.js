const Post = require("../models/post");
//getting comment also so that with it's post all it's comment also get deleted
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create(
      //it is actually saving in database
      {
        content: req.body.content,
        user: req.user._id,
      }
    );

    return res.redirect("back");
  } catch (error) {
    console.log("error ", error);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error ", error);
    return;
  }
};
