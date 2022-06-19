// create userschema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        // enum of "U" for user, "A" for admin
        type: String,
        enum: ["U", "A"],
        default: "U"
    },
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    }
},
{
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);