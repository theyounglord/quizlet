const User = require('../Models/user/user');
const Admin = require('../Models/admin/admin');
const jwt = require('jsonwebtoken');

const isLogin = async (req, res) => {
    try {   
        if (req.headers["x-access-token"]) {
            const token = req.headers["x-access-token"];
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            if (payload && payload.user) {
                let user;
                switch (payload.userType) {
                    case 'U': {
                        user = await User.findById(payload.user).lean();
                        break;
                    }
                    case 'A': {
                        user = await Admin.findById(payload.user).lean();
                        break;
                    }
                    default: {
                        return res.status(422).json({
                            message: 'Invalid user type',
                            error: 'Invalid user type'
                        });
                    }
                }
                if (!user) {
                    return res.status(422).json({
                        message: 'User did not login',
                        error: 'User did not login',
                        token : false
                    });
                }
                req.session.userid = payload.user;
                req.session.userType = payload.userType;
                req.session.name = user.name;
                req.session.email = user.email;
                next();
            }
            else {
                return res.status(400).send({
                    message: 'Access token has invalid format',
                    error: 'Access token has invalid format',
                    token : false
                });
            }
        }
        else {
            return res.send({
                message: 'User did not login',
                error: 'User did not login',
                token : false
            });
        }
    }
    catch (error) {
        console.log(error);
        if (error.message === 'jwt expired') {
            return res.status(400).send({
                message: 'Access token has expired',
                error: 'Access token has expired',
                token : false
            });
        }
        if (error.message === 'invalid signature') {
            return res.status(400).send({
                message: 'Access token has invalid signature',
                error: 'Access token has invalid signature',
                token : false
            });
        }
        return res.status(400).send({
            message: 'Internal server error',
            error: 'Internal server error',
            token : false
        });
    }
};

module.exports = { isLogin };