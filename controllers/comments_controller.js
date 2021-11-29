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
