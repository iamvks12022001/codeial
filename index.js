const express = require("express");
const app = new express();
const port = 8000;

const session = require("express-session");

const password = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

//to connect mongo db
const MongoStore = require("connect-mongo")(session);
app.use(expressLayouts);
app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db

app.use(
  session({
    name: "codieal",

    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running in the port no :${port}`);
});
