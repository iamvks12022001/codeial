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

const MongoStore = require("connect-mongo")(session);
//to get sass middleware
const sassMiddleware = require("node-sass-middleware-5");

//we call it's middleware 1st as we need the css file first
app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss", //scss folder location jisko css me convert karna ha
    dest: "./assets/css", //convert karna ke baad kaha us code ko rakna ha
    debug: true, //want to show error when it occur ..?
    outputStyle: "extended", //if wanrt to show all css code in one line then use compressed else use extended for multi line
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/> check in ejs pages
  })
);
app.use(expressLayouts);
app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());
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

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running in the port no :${port}`);
});
