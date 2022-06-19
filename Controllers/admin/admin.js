// require all models from the models folder
const Room = require('../../Models/room/room');
const Admin = require('../../Models/admin/admin');
const User = require('../../Models/user/user');
// const Quiz = require('../../Models/quiz/quiz');
const Question = require('../../Models/room/questions');
const Option = require('../../Models/room/options');
// const Answer = require('../../Models/room/answers');
// require shortid to generate a random access code
const shortid = require('shortid');

const { errorLog } = require('../../Utils/errorLog');

//  Creating an api to create a new room based on the access code and array of admins
const createRoom = async (req, res) => {
    try {
        // checking if the access code is already present in the database
        const room = await Room.findOne({ access_code: req.body.access_code });
        if (room) {
            return res.send({
                status: "failure",
                message: "Room already exists"
            });
        }
        // generating a random access code
        const access_code = shortid.generate();
        // creating a new room
        const newRoom = new Room({
            access_code: access_code,
            admins: req.session.userId
        });
        // creating a new room in the database
        const roomData = await Room.create(newRoom);
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Room created successfully",
            data: roomData
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

// Creating an api to get all the rooms on the basis of page number or limit
const getAllRooms = async (req, res) => {
    try {
        // getting the page number or limit from the request
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        // finding all the rooms in the database
        const rooms = await Room.find({}).skip((page - 1) * limit).limit(limit);
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Rooms fetched successfully",
            data: rooms
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

// Creating an api to get the last created room based on page number or limit
const getLatestRooms = async (req, res) => {
    try {
        // getting the page number or limit from the request
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        // finding the last created room in the database
        const rooms = await Room.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Rooms fetched successfully",
            data: rooms
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

// Craeting an api to get the room based on the access code 
const getRoom = async (req, res) => {
    try {
        // finding the room based on the access code
        const {
            access_code
        } = req.body;
        const room = await Room.findOne({ access_code: access_code });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Room fetched successfully",
            data: room
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

// create an api for creating question in the room based on the access code in the query
// find room id based on the access code
// type the question in the body
// type the options in the body
// type the answer in the body
// push the question id to the room's questions array
const createQuestions = async (req, res) => {
    try {
        // finding the room based on the access code and room id the body
        const {
            room_id,
        } = req.query;
        const {
            access_code
        }= req.body;
        const room = await Room.findOne({ access_code: access_code });
        // finding the room based on the room id
        const roomData = await Room.findOne({ _id: room_id });
        // creating a new question
        const newQuestion = new Question({
            question: req.body.question,
            options_data: req.body.options,
            answer: req.body.answer
        });
        // creating a new question in the database
        const questionData = await Question.create(newQuestion);
        // pushing the question id to the room's questions array
        roomData.questions.push(questionData._id);
        // pushing the room id to the question
        questionData.room_id = room_id;
        // updating the room in the database
        const updatedRoom = await Room.findOneAndUpdate({ _id: room_id }, roomData, { new: true });
        // updating the question in the database
        const updatedQuestion = await Question.findOneAndUpdate({ _id: questionData._id }, questionData, { new: true });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Question created successfully",
            data: [updatedRoom, updatedQuestion]
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
// create an api to create option for questionsid
// Use Bulk insert to insertMany options in the database
const createBulkOptions = async (req, res) => {
    try {
        const {
            question_id
        } = req.query;
        const {
            option_text,
            is_correct
        } = req.body;
        // finding the question based on the question id
        const question = await Question.findOne({ _id: question_id });
        // creating a new option
        const newOption = new Option({
            option_text: option_text,
            is_correct: is_correct,
            question_id: question_id
        });
        // creating a new option in the database
        const optionData = await Option.create(newOption);
        // pushing the option id and option_ to the question's options array
        const updatedQuestion = await Question.findOneAndUpdate({ _id: question_id }, { $push: { options_data: optionData._id }, }, { new: true });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Option created successfully",
            data: [updatedQuestion, optionData]
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
}


// Create an api to edit the question based on the question id in query
const editQuestions = async (req, res) => {
    try {
        // finding the question based on the question id
        const {
            question_id
        } = req.query;
        const question = await Question.findById(question_id);
        // updating the question's question and options and answer
        question.question = req.body.question;
        question.options = req.body.options;
        question.answer = req.body.answer;
        // updating the question in the database
        const questionData = await Question.findByIdAndUpdate(question_id, question, { new: true });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Question updated successfully",
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

// Create an api to list all the questions and their data based on the room id in query
const getQuestions = async (req, res) => {
    try {
        // finding the room based on the room id
        const {
            room_id
        } = req.query;
        const Questions = await Question.find({ room_id: room_id });
        // sending the response to the client
        return res.status(200).send({
            status: "success",
            message: "Questions fetched successfully",
            data: Questions
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


module.exports = { createRoom, getAllRooms, getLatestRooms, getRoom, createQuestions, editQuestions, getQuestions, createBulkOptions };