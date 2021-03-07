const express =require('express');// to get current instance of express
const router =express.Router();
const homeController =require('../controllers/home_controller');//path to homecontroller file


console.log("loaded");
router.get('/',homeController.home);//home method get imported from home_controller file
router.use('/users',require('./users'));//note : '.get ' is used to get  function  which can be imported

//'.use ' is to get route folder which can be imported ,it is middleware


// for any further routers access from here
// router.use('/routerName',require('path'));

module.exports=router;// to main index.js


// sare(sare means literally sare) route and controllers iss file me he ha
