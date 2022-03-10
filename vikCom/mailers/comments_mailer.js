const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (user) => {
  //getting the render functon from nodeMailer file
  // console.log("Sss", user);
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    "/comments/new_comment.ejs"
  );
  console.log("inside new comment mailer");
  nodeMailer.transporter.sendMail(
    {
      from: "NotASpam@vik.com", //username of the email
      to: user.email, //sending to the person who has commented
      subject: "Welcome To Our Family !",
      html: htmlString, //passing the html for template
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
