const express = require("express");
const app = new express();
const port = 8000;

const session = require("express-session");
//to get express session module
const password = require("passport"); //to get passport lib
const passportLocal = require("./config/passport-local-strategy");
//to get local strategy

const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

app.use(expressLayouts);
app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

//middleware for encrytion of cookies(it take the session cookies which is user id and then encrypte it)
app.use(
  session({
    name: "codieal",
    //to do use good secreat key before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //we provide max age so that cookies expire after certain time
      //and user have to login in again same what happen in bank website
      //max age take value in milisecond
    },
  })
);

//middleware to tell to use passport
app.use(passport.initialize());
app.use(passport.session());

//add middleware to call setAuthenticatedUser
app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));
//we shifted it do down so that before calling route above middleware get executed
//otherwise it will give error that passport.initialize not get used

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running in the port no :${port}`);
});
