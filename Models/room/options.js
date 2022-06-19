const mongooose = require('mongoose');
const Schema = mongooose.Schema;


const optionSchema = new Schema({
    option_text: {
        type: String,
        required: true
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    is_correct: {
        type: Boolean,
        required: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}
, {
    timestamps: true
});



module.exports = mongooose.model('Option', optionSchema);
