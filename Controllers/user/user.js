// require all models from the models folder
const Room = require('../../Models/room/room');
const Admin = require('../../Models/admin/admin');
const User = require('../../Models/user/user');
// const Quiz = require('../../Models/quiz/quiz');
const Question = require('../../Models/room/questions');
// const Answer = require('../../Models/room/answers');
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
        
module.exports = { joinRoom, getQuestion };