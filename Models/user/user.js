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
    //ip_addresses
    ip_addresses: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);