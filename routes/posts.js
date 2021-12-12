const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts_controller");

router.post("/create", passport.checkAuthentication, postsController.create); //checking whether user is sign in or not
// router to delete particular post with it's id get passed

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);

module.exports = router;
