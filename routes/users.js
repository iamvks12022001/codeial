const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

const passport = require("passport");
// to get passport file

//so now when we are signed in then then and thne only profile page
router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

//use passportas a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSesion
);
//so basicaly what happen is that 1st passport authenticate
//the user if it is able to do so then it call userController.createseesion
//{which redirect to home page}
//else if passport cant able to authenticate it will redirect to sign in page
router.get("/sign-out", usersController.destroySession); //to sign out
module.exports = router;
