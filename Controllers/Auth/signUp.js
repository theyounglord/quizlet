// require models from Models folder
const User = require('../../Models/user/user');
const errorLog = require('../../Utils/errorLog');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

// creating signup function for user
const signup = async (details) => {
    // creating a new user
    try {
        const { name, email, password } = details;
        const user = new User({
            name,
            email,
            password,
            ip_addresses: '',
            access_token: '',
            refresh_token: ''
        });
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // creating a new user
        const newUser = await user.create(user);
        // returning the new user
        return newUser;
    } catch (error) {
        console.log(error);
        // logging the error
        errorLog(error, 'Auth', 'L');
        // returning error
        return error;
    }
}

module.exports = { signup };
