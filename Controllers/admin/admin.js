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

module.exports = { createRoom, getAllRooms, getLatestRooms, getRoom };