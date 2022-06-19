// create questions schema for particular room

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options_data: [{
        option_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        },
        option_text: {
            type: String
        }
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