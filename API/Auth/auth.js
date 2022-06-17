const router = require('express').Router();
const {body, validationResult} = require('express-validator');

const {
    SignUp,
} = require('../../Controllers/Auth/auth');

