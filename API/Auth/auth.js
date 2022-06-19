const router = require('express').Router();
const {body, validationResult} = require('express-validator');

const {
    SignUp,
    Login,
} = require('../../Controllers/Auth/auth');

const {
    callLog
} = require('../../Middleware/callLog');

router.post('/signup', 
    callLog,
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    SignUp
);

router.post('/login',
    body('email').isEmail().exists().withMessage('Email is required'),
    body('password').isLength({min: 6}).exists().withMessage('Password is required'),
    body("userType").exists().notEmpty().isString().withMessage("User type is required"),
    callLog,
    Login
);

module.exports = router;