// create a schema for quiz room
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    access_code: {
        type: String,
        required: true
    },
    // array of ip_addresses
    ip_addresses: [{
        type: String,
        required: true
    }],
    // array of users
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // array of admins
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    // array of questions
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    // array of users with the scores
    scores_user: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        score: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Room', roomSchema);
