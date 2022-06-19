const Admin = require('../Models/admin/admin');
const User = require('../Models/user/user');
const Room = require('../Models/room/room');
const jwt = require('jsonwebtoken');

// create a function to check if the user is already in the room
const alreadyInRoom = async (req, res, next) => {
    try {
        // find access_code in the request body
        return await Room.findOne({ access_code: req.body.access_code }).lean().then(async (room) => {
            if (room) {
                // find the userid  in the user array of the room 
                let userid = room.users.find(user => user.userid === req.session.userid);
                // if the userid is already in the room do not allow to enter the room
                if (userid) {
                    return res.send({
                        status: "failure",
                        message: "You are already in the room"
                    });
                }
                // if the userid is not in the room allow to enter the room
                return next();
            }
            return res.send({
                status: "failure",
                message: "Room does not exist"
            });
        }
        ).catch(error => {
            console.log(error);
            return res.status(400).send({
                status: "failure",
                message: "Internal server error"
            });
        }
        );
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            status: "failure",
            message: "Internal server error"
        });
    }
};

module.exports = { alreadyInRoom };