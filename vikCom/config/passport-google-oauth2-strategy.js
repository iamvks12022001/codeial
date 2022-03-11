const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const newuser = require("../mailers/comments_mailer");
// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID, // e.g. asdfghjkkghjk.apps.googleusercontent.com
      clientSecret: process.env.CLIENT_SEC, // e.g. _ASDFA%KFJWIASDFAD-
      callbackURL:
        process.env.CALL_BACK ||
        "http://localhost:8000/users/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              avatar: User.avatarPath + "/avatar-1646916243830",
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }
              newuser.newComment(user);

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
