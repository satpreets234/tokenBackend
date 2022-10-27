const express=require('express');
const router=express.Router();
const{login,register,mainPage}=require('../controllers/user-controllers');
const {userValidate, verifyToken}=require('../middleware/middleware');

router.post('/login',login);
router.put('/register',userValidate,register);

// router.get('/mainpage',verifyToken,mainPage);

module.exports=router;