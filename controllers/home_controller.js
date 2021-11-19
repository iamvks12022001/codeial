module.exports.home = function (req, res) {
  // console.log(req.cookies); //show manually (reading )created cookies

  // res.cookie("user_id", 25); //change cookies
  // it is send as a respose bcz cookie is a response send to browser from server after identification
  //and can be use in to req
  return res.render("home", {
    title: "Home",
  });
};
// we directly go to views folder ka home file pe kuyki we already set views in index.js (main)

//module.exports.actionName=function(req,res){}
// i need to give acces of home method  to the file in route
