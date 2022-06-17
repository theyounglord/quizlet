// create admin schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
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
        default: "A"
    },
    // array of ip_addresses
    ip_addresses: [{
        type: String
    }],
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    }
});

module.exports = mongoose.model('Admin', adminSchema);