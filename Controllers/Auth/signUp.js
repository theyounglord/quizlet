// require models from Models folder
const User = require('../../Models/user/user');
const errorLog = require('../../Utils/errorLog');
const bcrypt = require('bcryptjs');
const { create } = require('../../Models/user/user');

// creating signup function for user
const signup = async (details) => {
    try {
        const { 
            name,
            email,
            password
        } = details;

        // checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return {
                status: false,
                message: 'User already exists, please login'
            };
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let query = {
            name,
            email,
            password: hashedPassword,
            role: 'U'
        };

        // creating user
        const check = await User.create(query);
        if (check) {
            return {
                status: true,
                message: 'User created successfully',
                data: check
            };
        }
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Auth', 'L');
        return {
            status: false,
            message: 'Internal Server Error',
            error
        };
    }
};


module.exports = { signup };
