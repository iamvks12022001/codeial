const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const port = 8000;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vie"));
// we are making contactlist array in server itself
app.use(express.urlencoded()); // use is use for middleware(parser
// is acting middleware here)
app.use(express.static("asse"));
app.use(function (req, res, next) {
  console.log("middleware 2 called");
  next();
});
app.use(function (req, res, next) {
  //next is use to call next middleware.
  console.log("middleware 1 called");
  next(); //next middleware is called
});

//middlewre 2

app.get("/", function (req, res) {
  //fetch the data and show it in website.
  Contact.find({}, function (err, contacts) {
    //no conditio in find query
    if (err) {
      console.log("error in fetching comtact from db");
      return;
    }
    return res.render("home", {
      title: "My contacts Lists",
      contact_list: contacts,
    });
  });
});
app.get("/delete-contact", function (req, res) {
  // get id from query in the url.
  let id = req.query.id;
  // find the contact in DB using id and delete it and referse the page.
  Contact.findByIdAndDelete(id, function (err) {
    //automatically referrinf to our databse db;
    if (err) {
      console.log("error in deleting the data");
      return;
    }
    return res.redirect("back");
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "let us play with ejs",
  });
});
// below is the controller for the submit button of form
app.post("/create-contact", function (req, res) {
  // it bascially make instance of scema that we create and save the data to our mongoDb.
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone, // same as we mention it in Schema
    },
    function (err, newContact) {
      // it will  add data to Db
      if (err) {
        console.log("error in creating contact");
        return;
      }
      console.log("****", newContact);
      return res.redirect("back");
    }
  );
});
app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server ", err);
  }
  console.log("server is running on port no. ", port);
});
