//to show all post from database
const Post = require("../../../models/post");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt") //sorting based on time of creatino of post....later created apper first
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.json(200, {
    message: "List of Posts",
    posts: posts,
  });
};

//to delete the post via api call
const Comment = require("../../../models/comment");
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    post.remove();

    await Comment.deleteMany({ post: req.params.id });
    //it will get the post from home_poage.js from js file
    //and send to the local

    return res.json(200, {
      message: "post and assosiated comment deleted succesfully !",
    });
  } catch (error) {
    return res.json(500, {
      message: "internal server error",
    });
  }
};
