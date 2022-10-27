const Joi=require('joi');

const userSchema=Joi.object({
    username:Joi.string().alphanum().min(2).max(50).required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().min(3).max(30).required()
})

const tokenSchema=Joi.object({
    tokenName:Joi.string().required(),
    tokenType:Joi.string().valid('Free',"Custom","Basic").required(),
    tokenSymbol:Joi.string().required()
    ,decimals: Joi.number().when('tokenType',{is:"Free",then:Joi.number().valid(18)}).when('tokenType',
    {is:'Basic',then:Joi.number().valid(18)}).when('tokenType',{is:'Custom',then:Joi.number().required()})
    ,supplyType:Joi.string().when('tokenType',{is:"Free",then:Joi.string().valid('Fixed')}).when('tokenType',
    {is:'Basic',then:Joi.string().valid('Fixed')}).when('tokenType',{is:'Custom',then:Joi.string().valid('Fixed','Capped','Unlimited').required()}),
    initialSupply:Joi.number().required(),maximumSupply:Joi.number().required(),
    accessType:Joi.string().when('tokenType',{is:"Free",then:Joi.string().valid('Owner')}).when('tokenType',
    {is:'Basic',then:Joi.string().valid('Owner')}).when('tokenType',{is:'Custom',then:Joi.string().valid('Owner','Roles').required()}),
    network:Joi.string().valid('Gorli', 'Mainnet', "Rinkeby", 'Binance Smart Chain', "Binance Smart Chain Testnet", 'Polygon Mainnet', 'Polygon Mumbai'),
    commissionFee:Joi.string().when('network',{is:"Mainnet",then:Joi.string().valid('0.075ETH')})
    .when('network',{is:"Binance Smart Chain",then:Joi.string().valid('0.5BNB')})
    .when('network',{is:"Polygon Mainnet",then:Joi.string().valid('150 MATIC')})
})

module.exports={userSchema,tokenSchema};