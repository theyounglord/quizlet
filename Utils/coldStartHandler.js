const admin = require('../Models/admin/admin');
const { errorLog } = require('../Utils/errorLog');
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
            return res.status(200).json({
                message: 'Admin created successfully',
                data: newAdmin
            });
        }
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Auth', 'L');
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    }
};

module.exports = { coldStart };