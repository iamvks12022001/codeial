const User=require('../models/user');// to accquire user schema

module.exports.profile=function(req,res){
res.render('profile',{
    title: "userProfile"
})
};

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"iCoder | Sign Up" 
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"iCoder | Sign In" 
    })
}
// get the sign up data

module.exports.create=function(req,res){
    // if password and confirm password are different
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
   // to check whether this email is avl or not
   User.findOne({email: req.body.email},function(err,user){
       if(err)
       {
          console.log('eror in finding user in signing up');
          return;
       }
       if(!user)
       {
           User.create(req.body,function(err,user){
            if(err)
            {
               console.log('eror in Creating user in signing up');
               return;
            }
            return res.redirect('/users/sign-in');// just for know for checking
           })
       }
       else
       {
        return res.redirect('back');
       }

})
}
// sign in that is create the session 

module.exports.createSesion=function(req,res){
    // to Do later

}