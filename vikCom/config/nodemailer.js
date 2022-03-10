const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  //give mail id jisase mail jaega with it's creadentials
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PASS,
  },

  //we need to authenticate our self
});

let renderTemplate = (data, relativePath) => {
  let mailHTML; // to beutifully creaft email
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), //to get  the html view
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
