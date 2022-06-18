const Admin = require('../Models/admin/admin');
const User = require('../Models/user/user');
const jwt = require('jsonwebtoken');

const isAccessAllowed = function (userTypeList) {
    return async function (req, res, next) {
        const userType = req.session.userType;
        // console.log(userType);
        try {
            if (userTypeList.includes(userType)) {
                // console.log("access allowed");
                return next();
            }
            return res.send({
                status: "failure",
                message: "You are not authorized"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({
                status: "failure",
                message: "Internal server error"
            });
        }
    };
};

module.exports = { isAccessAllowed };