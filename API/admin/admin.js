const router = require('express').Router();

const {
    createRoom,
    getAllRooms,
    getLatestRooms,
    getRoom
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

router.get('/getAllRooms',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    getAllRooms
);

router.get('/getLatestRooms',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    getLatestRooms
);

router.get('/getRoom',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    getRoom
);

module.exports = router;
