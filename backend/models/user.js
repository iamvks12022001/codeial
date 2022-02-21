const mongoose = require("mongoose");

//each user have it's own profile pic that is why we are confi mutler in user page

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, //defining in the schema
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true, // to basically give info like created at ,updated at
  }
);

//defining the storage
let storage = multer.diskStorage({
  //destination is used to determine within which folder the uploaded file should be stored
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH)); //exact path wher to store the file
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()); //exact file name ,,date now is use to make differnence in name of file each time you download/upload so there is no duplicationor or replacement happen
  },
});

//static function

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
); //single('avatar') ,,say that only single instance will be uploaded for fieldname avatar
userSchema.statics.avatarPath = AVATAR_PATH; //make it avl publicaly

const User = mongoose.model("User", userSchema);
module.exports = User;
