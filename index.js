const express = require("express");
const app = new express();
const port = 8000;
//to get express framework on port no 8000
const session = require("express-session");

const password = require("passport");
const passportLocal = require("./config/passport-local-strategy");
//get passort jwt
const passportJWT = require("./config/passport-jwt-strategy");

const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
//get googgle startegy here
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware-5");
// get connect -flash
const flash = require("connect-flash");
const customeMware = require("./config/middleware");

//include socket.io//chat_socket.js config file
//set up the chat server to be used with socket.io
const chatServer = require("http").Server(app); //get the http module
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000);
console.log("server is listining in port 5000");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(expressLayouts);
app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());

//route to connect upload file to see profile pic
//JAHA PE PIC HA USK folder ko access to karana padega na
app.use("/uploads", express.static(__dirname + "/uploads"));
//make the uploades path avl to the browser

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
//we have to use middleware right here i.e after session cookies and before route
//as flash message use session cookies
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
