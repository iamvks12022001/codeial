const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

const passport = require("passport");

//now profile page cant be accessed without proper sign in
//this is because of  middleware added in this route
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
//profile update route
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSesion
);

router.get("/sign-out", usersController.destroySession);
module.exports = router;
