const router = require('express').Router();

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
    getIpAddress
} = require('../../Utils/ip_adress');

const {
    isAccessAllowed
} = require('../../Middleware/isAccessAllowed');

// const {
//     alreadyInRoom
// } = require('../../Middleware/alreadyInRoom');

const {
    joinRoom,
    getQuestion
} = require('../../Controllers/user/user');

router.patch('/joinRoom',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['U']),
    joinRoom
);

router.get('/getQuestion',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['U']),
    getQuestion
);

module.exports = router;