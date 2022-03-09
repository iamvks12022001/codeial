const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error in connecting the database"));

db.once("open", function () {
  console.log("Connected to Database ::Mongo DB");
});

module.exports = db;
