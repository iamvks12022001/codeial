const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller");
///we also check whether user sign or not
router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;
