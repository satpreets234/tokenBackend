const express=require('express');
const router=express.Router();
const{tokenDetails}=require('../controllers/user-controllers');
const {tokenDetailsValidate}=require('../middleware/middleware');

router.post('/tokendetails',tokenDetailsValidate,tokenDetails);

// router.get('/mainpage',verifyToken,mainPage);

module.exports=router;