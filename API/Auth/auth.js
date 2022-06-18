const router = require('express').Router();
const {body, validationResult} = require('express-validator');

const {
    SignUp,
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

module.exports = router;