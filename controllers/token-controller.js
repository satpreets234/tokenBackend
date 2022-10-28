const tokenDetail = require('../models/token-details-model');


async function tokenDetails(req, res) {
    try {
        const { tokenName, tokenType, tokenSymbol, decimals,
            supplyType, initialSupply, maximumSupply, accessType, network,commissionFee } = req.body;

        const detail = new tokenDetail({
            tokenName, tokenType, tokenSymbol
            , decimals, supplyType, initialSupply,
            maximumSupply, accessType, network,commissionFee
        });
        const alldetails = await detail.save();
        if (alldetails._id != null || alldetails._id != '') {
            console.log(alldetails);
            sendResponse(res, 1, 200, alldetails)
        } else {
            sendResponse(res, 0, 400, "Cannot Saved");
        }
    } catch (error) {
        sendResponse(res, 0, 500, error);
    }
}

async function allTokens(req,res){
    try {
        const tokens=await tokenDetail.find({},{projection:{
                tokenName: 1,
                tokenSymbol: 1,
                supplyType: 1,
                initialSupply: 1,
                maximumSupply: 1,
                network: 1,
                commissionFee:1
        }})
        console.log(tokens);
    } catch (error) {
        sendResponse(res, 0, 500, error);
    }
}
module.exports={tokenDetails,allTokens};