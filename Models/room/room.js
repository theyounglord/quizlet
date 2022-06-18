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
        type: String
    }],
    // array of users
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // array of admins for controlling the room (for advance features)
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    number_of_questions: {
        type: Number,
        required: true
    },
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
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
