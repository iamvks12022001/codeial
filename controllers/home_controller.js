const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

  //it will only show the post content
  // Post.find({}, function(err, posts){
  //     return res.render('home', {
  //         title: "Codeial | Home",
  //         posts:  posts
  //     });
  // });

  //if we want  to so user also then we have do little changes here
  // populate the user of each post
  //what we have in user is user id which is number but we
  //want is name i.e we want to fetch user details from user_id
  //so for that we have to pre populate the user first
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    });
};

// module.exports.actionName = function(req, res){}
