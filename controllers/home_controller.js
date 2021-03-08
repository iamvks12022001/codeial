module.exports.home=function(req,res){
    return res.render('home',{
        title : "Home"
    })
}
// we directly go to views folder ka home file pe kuyki we already set views in index.js (main)

//module.exports.actionName=function(req,res){}
// i need to give acces of home method  to the file in route 