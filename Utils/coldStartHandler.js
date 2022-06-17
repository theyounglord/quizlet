// require admin from Models folder
const admin = require('../Models/admin/admin');
// require errorLog from Utils folder
const errorLog = require('../Utils/errorLog');
// require bcrypt from bcryptjs
const bcrypt = require('bcryptjs');
const coldStart = async() => {
    try {
        const adminData = await admin.findOne({ email: "kumardeepam8600@gmail.com" });
        if(adminData){
            return;
        }
        const salt = await bcrypt.genSalt(10);
        var adminPassword = await bcrypt.hash("deepam@123", salt);
        const newAdmin = await admin.create({
            name: "Deepam",
            email: "kumardeepam8600@gmail.com",
            password: adminPassword
        });
        if (newAdmin) {
            console.log("Admin Created");
            return true;
        }
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Auth', 'L');
        return false;
    }
};

module.exports = { coldStart };