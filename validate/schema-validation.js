const Joi=require('joi');

const userSchema=Joi.object({
    username:Joi.string().alphanum().min(2).max(50).required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().min(3).max(30).required()
})

const tokenSchema=Joi.object({
    tokenName:Joi.string().required(),
    tokenType:Joi.string().valid('free',"custom","basic").required(),
    tokenSymbol:Joi.string().required()
    ,decimals: Joi.number().when('tokenType',{is:"free",then:Joi.number().valid(18)}).when('tokenType',
    {is:'basic',then:Joi.number().valid(18)}).when('tokenType',{is:'custom',then:Joi.number().required()})
    ,supplyType:Joi.string().when('tokenType',{is:"free",then:Joi.string().valid('fixed')}).when('tokenType',
    {is:'basic',then:Joi.string().valid('fixed')}).when('tokenType',{is:'custom',then:Joi.string().valid('fixed','capped','unlimited').required()}),
    initialSupply:Joi.number().required(),maximumSupply:Joi.number().required(),
    accessType:Joi.string().when('tokenType',{is:"free",then:Joi.string().valid('owner')}).when('tokenType',
    {is:'basic',then:Joi.string().valid('owner')}).when('tokenType',{is:'custom',then:Joi.string().valid('owner','roles').required()}),
    network:Joi.number().valid(1,5,4,137,80001,97,56),
    commissionFee:Joi.string().when('network',{is:1,then:Joi.string().valid('0.075ETH')})
    .when('network',{is:97,then:Joi.string().valid('0.5BNB')})
    .when('network',{is:137,then:Joi.string().valid('150 MATIC')})
})

module.exports={userSchema,tokenSchema};