const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
  //getting the render functon from nodeMailer file
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  console.log("inside new comment mailer");
  nodeMailer.transporter.sendMail(
    {
      from: "NotASpam@vik.com", //username of the email
      to: comment.user.email, //sending to the person who has commented
      subject: "New Comment Published!",
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
