const apiCallLog = require('../Models/logs/ApiCallLog');
const { errorLog } = require('../Utils/errorLog');

const callLog = async (req, res, next) => {
    try {
      console.log(req.originalUrl);
      await apiCallLog.findOneAndUpdate(
        { $and: [{ api: req.originalUrl }, { method: req.method }] },
        {
          $push: {
            calls: {
              userType: req.userType,
              data: req.body,
            },
          },
        },
        { upsert: true }
      );
      next();
    }
    catch (error) {
        console.log(error);
        errorLog(error, req.originalUrl, 'error');
        res.status(500).json({
            message: 'Internal Server Error',
            error: error,
        });
    }
};

module.exports = { callLog };