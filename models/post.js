const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      //since we link a post to user so we need to have this
      type: mongoose.Types.ObjectId,
      //this is for to connect to  user from Db
      ref: "User", //we are referencing to user
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports.Post;
