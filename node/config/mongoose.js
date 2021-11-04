const mongoose = require("mongoose");
//reqire the library

mongoose.connect("mongodb://localhost/contacts_list_db");
// connect the database

const db = mongoose.connection;
//accqiure the connection

db.on("error", console.error.bind(console, "connection error:"));
//if there is error

//if successfully connection then call that function
db.once("open", function () {
  console.log("succesfully connected");
  // we're connected!
});
