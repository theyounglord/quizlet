// create questions schema for particular room

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    answer: {
        type: String,
        required: true
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Question', questionSchema);