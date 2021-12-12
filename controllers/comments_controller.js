const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content, //actualle content
          post: req.body.post, //asically post id
          user: req.user._id, //jisne comment kiya ha uska id
        },
        function (err, comment) {
          // handle error

          //post ke schema ke comment fields me comment id add karne ke liya
          post.comments.push(comment);
          post.save(); //we are updating so we have to call save to get updated result

          res.redirect("/");
        }
      );
    }
  });
};

//deleting a comment
module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    let postId = comment.post;
    Post.findById(postId, function (err, post) {
      let userId = post.user;
      if (post.user == req.user.id || comment.user == req.user.id) {
        //again checkinga as view me log inspect karke v call karsakte ha
        comment.remove();
        let postId = comment.post;
        Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: req.params.id } }, //basically deleting that comment id from post schema
          function (err, post) {
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    });
  });
};
