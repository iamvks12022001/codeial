const Post = require("../models/post");

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
