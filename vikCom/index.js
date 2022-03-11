const express = require("express");
const app = new express();
const port = process.env.PORT || 8000; //for heruku deploy
//to get express framework on port no 8000
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const password = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware-5");
const flash = require("connect-flash");
const customeMware = require("./config/middleware");

if (process.env.NAME == "development") {
  app.use(
    sassMiddleware({
      src: "./assets/scss",
      dest: "./assets/css",
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}
app.use(express.static("./assets"));
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

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
app.use(flash());
app.use(customeMware.setFlash); // to send the messages to local storage

app.use(require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running in the port no :${port}`);
});
//run server on 8000
