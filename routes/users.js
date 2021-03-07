const express =require('express');// to get current instance of express
const router =express.Router();
const usersController =require('../controllers/users_controller');//path to user_controller file



router.get('/profile',usersController.profile);//home method get imported from home_controller file
// usersController.profile run when client want user/profile request


module.exports=router;// to index.js of router


// sare users ke route and controllers iss file me he ha
