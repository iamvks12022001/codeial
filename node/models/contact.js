const mongoose = require("mongoose"); // to acquiremongoose
//to make a schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    requird: true,
  },
  phone: {
    type: String,
    requird: true,
  },
});
//to give name to database
const Contact = mongoose.model("Contact", contactSchema);
//to export the module
module.exports = Contact;
