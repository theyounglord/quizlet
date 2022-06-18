const bcrypt = require('bcryptjs');
// require all models from Models folder
const User = require('../../Models/user/user');
const Admin = require('../../Models/admin/admin');
const jwt = require('jsonwebtoken');
const { errorLog } = require('../../Utils/errorLog');
const { setIpAddresses } = require('../../Utils/ip_adress');

const userLogin = async (details) => {
    try {
        const { userType, email, password } = details;

        // checking if user already exists
        let user;
        switch (userType) {
            case "U": {
                user = await User.findOne({ email });
                break;
            }
            case "A": {
                user = await Admin.findOne({ email });
                break;
            }
        }
        console.log(user);
        if (!user) {
            return {
                status: false,
                message: 'User does not exist'
            };
        }

        // checking if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: false,
                message: 'Password is incorrect'
            };
        }

        delete user.password;

        // creating token
        const token = jwt.sign(
            {
                user: user._id,
                userType: userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        );

        const refresh_token = jwt.sign(
            {
                user: user._id,
                userType: userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        );


        // checking if user password is expired
        
        let dataModel;

        switch (userType) {
            case 'U': {
                dataModel = User;
                break;
            }
            case 'A': {
                dataModel = Admin;
                break;
            }
        }
        const newUpdate = await dataModel.findByIdAndUpdate(
            user._id,
            {
                $set: { refresh_token }
            },
            { new: true }
        );
        
        delete newUpdate.password;
        delete newUpdate.refresh_token;
        delete newUpdate.ip_addresses;
        delete newUpdate.access_token;

        return {
            status: true,
            message: 'User logged in successfully',
            token,
            refresh_token,
            user: newUpdate
        };
    }
    catch (error) {
        errorLog(error);
        return {
            status: false,
            message: 'Something went wrong'
        };
    }
};


module.exports = { userLogin };