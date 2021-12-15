module.exports.setFlash = function (req, res, next) {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};

//this is cretead to pass the message set in controller to the locals
//so that ejs can show the message
