const express=require('express');
const router=express.Router();
const{tokenDetails, allTokens}=require('../controllers/token-controller');
const {tokenDetailsValidate, verifyToken}=require('../middleware/middleware');

router.post('/tokendetails',tokenDetailsValidate,tokenDetails);
router.get('/alltokens',verifyToken,allTokens)
// router.get('/mainpage',verifyToken,mainPage);

module.exports=router;