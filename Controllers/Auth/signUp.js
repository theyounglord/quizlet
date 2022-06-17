// require models from Models folder
const User = require('../../Models/user/user');
const errorLog = require('../../Utils/errorLog');
const bcrypt = require('bcryptjs');

// creating signup function for user
const signup = async (details) => {
    // creating a new user
    try {
        const { name, email, password } = details;
        const user = new User({
            name,
            email,
            password
        });
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // creating the user
        const newUser = await user.create(user);
        if (newUser) {
            return res.status(200).json({
                message: 'User created successfully',
                data: newUser
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
}

module.exports = { signup };
