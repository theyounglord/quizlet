// require all models from the models folder
const Room = require('../../Models/room/room');
const Admin = require('../../Models/admin/admin');
const User = require('../../Models/user/user');
// const Quiz = require('../../Models/quiz/quiz');
const Question = require('../../Models/room/questions');
const Option = require('../../Models/room/options');
// require shortid to generate a random access code
const shortid = require('shortid');

const { errorLog } = require('../../Utils/errorLog');
const { getIpAddress } = require('../../Utils/ip_adress');

//  Creating an api to create a new room based on the access code
const joinRoom = async (req, res) => {
    try {
        const {
            access_code,
        }= req.body;
        // finding the room based on the access code
        const room = await Room.findOne({ access_code: access_code });
        if (!room) {
            return res.send({
                status: "failure",
                message: "Room does not exist"
            });
        }
        // finding the user based on the user id
        const user = await User.findOne({ _id: req.session.userid });
        if (!user) {
            return res.send({
                status: "failure",
                message: "User does not exist"
            });
        }
        // checking if the user is already present in the room
        if (room.users.includes(user._id)) {
            return res.send({
                status: "failure",
                message: "User already present in the room"
            });
        }
        else {
            // adding the user to the room
            room.users.push(user._id);
            // updating the room in the database
            const roomData = await Room.findByIdAndUpdate(room._id, room, { new: true });
            // sending the response to the client
            return res.status(200).send({
                status: "success",
                message: "User added successfully",
                data: roomData
            });
        }
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Room', 'L');
        return res.status(500).send({
            status: "failure",
            message: "Internal Server Error",
            error: error
        });
    }
};

// Creating an api to get particular question based on the question id(in query) of the room's access code
const getQuestion = async (req, res) => {
    try {
        // finding the room based on the access code
        const {
            access_code,
            question_id,
        } = req.query;
        const room = await Room.findOne({ access_code: access_code });
        // finding the question based on the question id
        const question = await Question.findOne({ _id: question_id });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Question fetched successfully",
            data: question
        });
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Room', 'L');
        return res.status(500).send({
            status: "failure",
            message: "Internal Server Error",
            error: error
        });
    }
};

// Creating an api to answer the question based on the question id(in query)
// check in the database if the user has already answered the question or not by checking whether the user id is present in the array of the qustion's options_data._id's upvotes
// generating a score of the user based on the number of correct option he has selected

const answerQuestion = async (req, res) => {
    try {
        // finding the room based on the access code
        const {
            access_code,
            question_id
        } = req.query;
        const {
            option_id,
        } = req.body;
        const room = await Room.findOne({ access_code: access_code });
        if (!room) {
            return res.send({
                status: "failure",
                message: "Room does not exist"
            });
        }
        // check if the question id is present in the room's questions array
        if (!room.questions.includes(question_id)) {
            return res.send({
                status: "failure",
                message: "Question does not exist"
            });
        }
        // finding the question based on the question id
        const question = await Question.findOne({ _id: question_id });
        if (!question) {
            return res.send({
                status: "failure",
                message: "Question does not exist"
            });
        }
        // find all the options of the question
        const options = await Option.find({ question_id: question._id });    
        if (!options) {
            return res.send({
                status: "failure",
                message: "Option does not exist"
            });
        }
        // check if the user has already selected any other option_id or not
        if (question.options_data.find(option => option.user_id === req.session.userid)) {
            return res.send({
                status: "failure",
                message: "You have already selected an option"
            });
        }
        // check if the user has already answered the question or not
        if (question.options_data.find(option => option.user_id === req.session.userid)) {
            return res.send({
                status: "failure",
                message: "You have already answered the question"
            });
        }
        // find the option_id in the options_data array and push the user id to the upvotes array
        const options_data = question.options_data.find(option => option._id === option_id);
        // finding the selected option based on the option_id
        const selectedOption = options.find(option => option._id === option_id);
        // push the user id to the upvotes array
        await Option.findByIdAndUpdate(option_id, { $push: { upvotes: req.session.userid } });
        // check if the option_id is correct or not
        if (options.is_correct) {
            // add 10 points to the user's score in the room
            room.users.find(user => user.toString() === req.session.userid).score += 10;
            // add 10 points to the user's score in the database
            const user = await User.findOne({ _id: req.session.userid });
            user.score += 10;
            await User.findByIdAndUpdate(user._id, user, { new: true });
        }
        else {
            // subtract 5 points to the user's score in the room
            room.users.find(user => user.toString() === req.session.userid).score -= 5;
            // subtract 5 points to the user's score in the database
            const user = await User.findOne({ _id: req.session.userid });
            user.score -= 5;
            await User.findByIdAndUpdate(user._id, user, { new: true });
        }
        // update the question in the database
        const questionData = await Question.findByIdAndUpdate(question._id, question, { new: true });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Question answered successfully",
            data: questionData
        });
    }
    catch (error) {
        console.log(error);
        errorLog(error, 'Room', 'L');
        return res.status(500).send({
            status: "failure",
            message: "Internal Server Error",
            error: error
        });
    }
};



module.exports = { joinRoom, getQuestion, answerQuestion };