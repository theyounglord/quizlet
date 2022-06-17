const errorlog = require('../Models/errorLogs/errorLogs');
// var Slack = require('slack-node');


const errorLog = async(err,api,severity) => {
    try{

        if(!err || !api ||!severity){
            return;
        }
        await errorlog.create({
            error:err,
            api:api,
            severity:severity
        })

    }
    catch(error){
        console.log(error);
    }
}

module.exports = {errorLog}