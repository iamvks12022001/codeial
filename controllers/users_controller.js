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
