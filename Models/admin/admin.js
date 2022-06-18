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
        type: String,
        enum: ["U", "A"],
        default: "A"
    },
    // array of ip_addresses so that in future we can notify admin if he/she is logged in from multiple devices
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