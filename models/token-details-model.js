const mongoose = require('mongoose');
const tokenDetails = new mongoose.Schema({
        tokenName: { 
            type: String,
             required: true 
        },
        tokenType: {
            type: String,
            enum: ["Basic", "Custom", "Free"]
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
            enum: ['Fixed', "Capped", "Unlimited"],
            default: 'Fixed'
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
            enum: ['Owner', "Roles"],
            default: 'Owner'
        },
        network: {
            type: String,
            enum: ['Gorli','Mainnet',"Rinkeby",'Binance Smart Chain',
            "Binance Smart Chain Testnet",'Polygon Mainnet','Polygon Mumbai']
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

