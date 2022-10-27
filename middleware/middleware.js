
const {userSchema,tokenSchema}=require('../validate/schema-validation');
const jwt=require('jsonwebtoken');
const user=require('../models/user-model');

const verifyToken=async (req,res,next)=>{
    try {
        const bearerToken=req.header('Authorization');
        const token=bearerToken.split(' ')[1];
        if(token!='' || token!=undefined){
            try {
                const verifyAuth=jwt.verify(token,'secretKey');
                if(verifyAuth.email!='' || verifyAuth.email!=undefined){
                  const userDetails=await user.findOne({email:verifyAuth.email}); 
                  req.body.loggedUser=userDetails;
                  next();
                }
            } catch (error) {
            sendResponse(res,0,500,'Internal Server Error1') 
            }
        }
        else{
        }
    } catch (error) {
        sendResponse(res,0,400,'Unauthorized Acccess') ;
    }
}

const userValidate=async(req,res,next)=>{
        try {
            console.log('rfvgbhjnkm');
            const {error,value}=userSchema.validate(req.body);
            if(!error){
                console.log('abc');
                next();
            }else{
                res.send(error);
            }
        } catch (err) {
            res.send(err);
        }
}

const sendResponse=(res,success,statusCode,msg)=>{
    res.status(statusCode).json({success:success,msg:msg});
}

const tokenDetailsValidate=async(req,res,next)=>{
    try {
        console.log('hjnkm');
        const {error,value}=tokenSchema.validate(req.body);
        if(!error){
            req.body.network=='Mainnet'?req.body.commissionFee='0.075ETH'
            :req.body.network=='Binance Smart Chain'?req.body.commissionFee='0.5BNB'
            :req.body.network=='Polygon Mainnet'?req.body.commissionFee='150MATIC':'Free'
            next();
        }else{
            res.send(error);
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports={userValidate,sendResponse,verifyToken,tokenDetailsValidate};