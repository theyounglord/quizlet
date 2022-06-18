const router = require('express').Router();

const {
    createRoom
} = require('../../Controllers/admin/admin');

const {
    activityLog
} = require('../../Middleware/activityLog');

const {
    callLog
} = require('../../Middleware/callLog');

const {
    isLogin
} = require('../../Middleware/isLoggedIn');

const {
    isAccessAllowed
} = require('../../Middleware/isAccessAllowed');

// express-validator
const {
    body,
    validationResult
} = require('express-validator');

router.post('/createRoom', 
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    createRoom
);

module.exports = router;
