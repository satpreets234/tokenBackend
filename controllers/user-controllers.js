const user = require('../models/user-model');
const { sendResponse } = require('../middleware/middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenDetail = require('../models/token-details-model');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const alreadyUser = await user.findOne({ email: email });
        if (!alreadyUser) {
            sendResponse(res, 0, 404, 'Not Found');
        } else {
            const matchPassword = await bcrypt.compare(password, alreadyUser.password);
            if (matchPassword) {
                const jwtToken = jwt.sign({ email: alreadyUser.email }, 'secretKey', { expiresIn: '1d' });
                sendResponse(res, 1, 200, {
                    username: alreadyUser.username, email: alreadyUser.email
                    , jsonWebtoken: jwtToken
                })
            }
            else {
                sendResponse(res, 0, 401, "Unauthorized Access");
            }
        }
    } catch (error) {
        sendResponse(res, 0, 500, error);
    }
}

async function register(req, res) {
    try {
        const { email, password, username } = req.body;
        const alreadyUser = await user.findOne({ email: email });
        if (alreadyUser) {
            sendResponse(res, 0, 409, "Duplicate details");
        }
        else {
            const newUser = new user({ email: email, password: password, username: username });
            const savedUser = await newUser.save();
            if (savedUser) {
                sendResponse(res, 1, 200, { username: savedUser.username, email: savedUser.email })
            } else {
                sendResponse(res, 0, 500, 'Internal Server Error')
            }
        }
    } catch (error) {
        sendResponse(res, 0, 500, error)
    }

}

async function mainPage(req, res) {
    try {
        sendResponse(res, 1, 200, "Hello Mainpage .")
    } catch (error) {
        sendResponse(res, 0, 500, error)
    }
}

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

module.exports = { login, register, mainPage, tokenDetails };