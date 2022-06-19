const mongoose = require('mongoose');

const errorLog = mongoose.Schema({
    error:{
        type:String,
        required:true
    },
    api:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["H","M","L"]
        //H for high
        //M for medium
        //L for low
    },
    reason:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model("errorLog",errorLog)
