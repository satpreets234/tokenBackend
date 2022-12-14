const mongoose = require('mongoose');
const tokenDetails = new mongoose.Schema({
        tokenName: { 
            type: String,
             required: true 
        },
        tokenType: {
            type: String,
            enum: ["basic", "custom", "free"]
            , required: true
        },
        tokenSymbol: {
            type: String,
            required: true
        },
        decimals: {
            type: Number,
            default: 18
        },
        supplyType: {
            type: String,
            enum: ['fixed', "capped", "unlimited"],
            default: 'fixed'
        },
        initialSupply: {
            type: Number,
            required: true
        },
        maximumSupply: {
            type: Number,
            required: true
        },
        accessType: {
            type: String,
            enum: ['owner', "roles"],
            default: 'owner'
        },
        network: {
            type: Number,
            enum: [1,5,4,137,80001,97,56]
        },
        commissionFee: {
            type: String,
            enum:['0.075ETH','0.5BNB','150MATIC','Free'],
            required:true
        }
})

tokenDetails.pre('save',function(next){
    try {
        if(this.maximumSupply==this.initialSupply){
            next();
        }
        else{
            next('Maximum Supply should be equal to Initial Supply')
        }
    } catch (error) {
        next(error);
    }
    
})
module.exports = mongoose.model('tokenDetails', tokenDetails);

