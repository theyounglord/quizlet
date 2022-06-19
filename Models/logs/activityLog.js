const mongoose = require('mongoose');
const activityLog = new mongoose.Schema({
    api: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    calls: {
        userType: {
            type: String,
            required: true
        },
        data:{
            type:String,
            required:true
        }
    }
},{timestamps:true})

module.exports = mongoose.model('activityLog',activityLog);