const passport = require("passport"); //getting passport
const JWTStrategy = require("passport-jwt").Strategy; //getting strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; //extract jwt

const User = require("../models/user");

//get the code from documentation
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial", //for encypt and decrypt we need this
};

//finding user with payload info i.e user ke pass phela se token ha,usko khuch resource
//cahiya server se isliya jet-token bheja ha server ko
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
