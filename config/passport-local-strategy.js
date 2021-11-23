const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//these 3 part code is already avl in passport site ,get that from there

//1. authentication using passport
passport.use(
  new LocalStrategy(
    {
      //telling passport to use LOcal Strategy
      usernameField: "email", //defining usernamefield
    },
    function (email, password, done) {
      // this function have 3 argument ,one of which is done which reporting back to passport.js
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        //finding user
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err); //done is callback function
        }

        if (!user || user.password != password) {
          //if user not found or passpord not match
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user); //if found and passport match then through back a user to passport serializer (which take user id which is encrypted )
      });
    }
  )
);

//2. serialization mean making a cookies
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//3. deserializing mean getting back the user from cookies
// deserializing the user from the key in the cookies.i.e simply getting back the user from the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});
//here we serialize the user by id so we have to deserialize it also by user id

//we have to desearlized when browser make request from server ,

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

//setting the user for view
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
