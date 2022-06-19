// require admin from Models folder
const admin = require('../Models/admin/admin');
// require errorLog from Utils folder
const {errorLog} = require('../Utils/errorLog');
const requestIp = require('request-ip');

// create an api to get the ip address of the client using request-ip
const getIpAddress = (req, res) => {
    try {
        // getting the ip address of the client
        const ip = requestIp.getClientIp(req);
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Ip address fetched successfully",
            data: ip
        });
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Room', 'L');
        return res.status(500).send({
            status: "failure",
            message: "Internal Server Error",
            error: error
        });
    }
};

module.exports = { getIpAddress };