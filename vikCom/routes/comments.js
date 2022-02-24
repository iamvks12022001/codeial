const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller");

router.post("/create", passport.checkAuthentication, commentsController.create);
///we also check whether user sign in or not,bcz view me log inspect karke khuch v call kar sakte ha
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentsController.destroy
);
module.exports = router;
