// require admin from Models folder
const admin = require('../Models/admin/admin');
// require errorLog from Utils folder
const errorLog = require('../Utils/errorLog');
const requestIp = require('request-ip');

// update ip_addresses in admin whose email is kumardeepam8600@gmail.com
// check if same ip_addresses is present in database then leave it else add it in the array of ip_addresses
const setIpAddresses = async(req) => {
    try {
        const adminData = await admin.findOne({ email: "kumardeepam8600@gmail.com" });
        if(adminData){
            const ip_addresses = requestIp.getClientIp(req);
            if(adminData.ip_addresses.indexOf(ip_addresses) === -1){
                adminData.ip_addresses.push(ip_addresses);
                await adminData.save();
            }
            return;
        }
        return;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { setIpAddresses };