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

module.exports = { createRoom };