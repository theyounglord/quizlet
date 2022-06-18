const router = require('express').Router();

const {
    createRoom,
    getAllRooms,
    getLatestRooms,
    getRoom,
    createQuestions,
    editQuestions,
    getQuestions,
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

router.post('/createQuestions',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    body('question').exists().notEmpty().isArray().withMessage('Questions is required'),
    // options is an array of strings
    body('options').exists().notEmpty().isArray().withMessage('Options is required'),
    // answer is a string
    body('answer').exists().notEmpty().isString().withMessage('Answer is required'),
    createQuestions
);

router.patch('/editQuestions',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    body('question').exists().notEmpty().isString(),
    body('options').exists().notEmpty().isArray(),
    body('answer').exists().notEmpty().isString(),
    editQuestions
);

router.get('/getQuestions',
    isLogin,
    callLog,
    activityLog,
    isAccessAllowed(['A']),
    getQuestions
);


module.exports = router;
