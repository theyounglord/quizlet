const { signup } = require('./signUp');
const { userLogin } = require('./userLogin');
const { User } = require('../../Models/user/user');
const { admin } = require('../../Models/admin/admin');
const jwt = require('jsonwebtoken');
const { errorLog } = require('../../Utils/errorLog');
const { setIpAddresses } = require('../../Utils/ip_adress');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//only for users
const SignUp = async (req, res) => {
    try {
        if (req.session.user) {
            return res.status(200).json({
                message: 'You are already logged in',
                data: req.session.user
            });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Validation Error',
                error: errors.array()
            });
        }
        let result = await signup(req.body);
        if (result) {
            return res.status(200).json({
                message: 'User created successfully',
                data: result
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

const Login = async (req, res) => {
    try {
      console.log("here");
        if (req.session.user) {
            return res.status(200).json({
                message: 'You are already logged in',
                data: req.session.user
            });
        }
        const err = validationResult(req);
        console.log(err);
        if (err.errors.length !== 0) {
            return res.status(422).json({
                message: 'Validation Error',
                err: err.errors
            });
        }
  
      const token = await userLogin(req.body);
      if (token.status) {
        return res.status(200).send({ auth: true, ...token });
      }
      return res.status(200).send({ auth: false, ...token });
    } catch (error) {
      console.log(error);
      errorLog(error, "login-driver", "H");
  
      return res.status(400).send(error);
    }
  };

module.exports = { SignUp, Login };