const mongoose = require("mongoose");
const log = new mongoose.Schema({
    api: {
        type:String,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    calls:[{
        userType:{
            type:String,
            default:"NA",
            required:true
        },
        time:{
            type:Date,
            default:Date.now()
        }
    }]
    

},{timestamps:true})

module.exports = mongoose.model("logs",log);