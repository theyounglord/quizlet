const activityLogs = require('../Models/logs/activityLog');
const { errorLog } = require('../Utils/errorLog');

const activityLog = async(req,res,next) => {
    try {
        if(!["A"].includes(req.session.userType)){
            return next();
        }
        await activityLogs.findOneAndUpdate({$and:[{api:req.originalUrl},{method:req.method}]},{$push:{calls:{userType:req.session.userType,data:JSON.stringify(req.body)}}},{upsert:true,new:true});
        next();
    } catch (error) {
        console.log(error);
        errorLog(error, "activity-log", "H");
    }
};

module.exports = { activityLog };