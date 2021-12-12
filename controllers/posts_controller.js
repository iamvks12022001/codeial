const Post = require("../models/post");
//getting comment also so that with it's post all it's comment also get deleted
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    //it is actually saving in database
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};
module.exports.destroy = function (req, res) {
  //req.params.id contains id of post to be deleted
  Post.findById(req.params.id, function (err, post) {
    //post.user contains id of the user who posted that post.
    //req.user contains info of current logged in user.
    // .id means converting the object id into string.
    if (post.user == req.user.id) {
      //check what we do on home page ,is just for so UI for delete button not get shown
      //if logged in user not create that post but it is possible hacker directly use URL
      //to delete that page after getting that post id by  inspecting
      post.remove();

      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
