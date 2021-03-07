const express =require('express');// to get current instance of express
const router =express.Router();
const homeController =require('../controllers/home_controller');//path to homecontroller file


console.log("loaded");
router.get('/',homeController.home);//home method get imported from home_controller file


module.exports=router;// to main index.js


// sare route and controllers iss file me he ha
