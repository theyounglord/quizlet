const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

app.use(
    rateLimit({
      windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
      max: 5,
      message: "You exceeded 100 requests in 12 hour limit!",
      headers: true,
        handler: function (req, res) {
            res.status(429).send({
                status: "failure",
                message: "You exceeded 100 requests in 12 hour limit!"
            });
        }
    }
    )
    );
//



app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false
    })
);

require('dotenv').config();
var corsOptions = {
    origin: function(origin, callback) {
        console.log(origin);
        if(process.env.origin.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cors(process.env.origin));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const uri = process.env.MONGODB_URI;
mongoose
    .connect(uri)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);   
    });

// checking if one admin data is present in database, if there is no data then create one otherwise leave it
const admin = require('./Models/admin/admin');
const errorLog = require('./Utils/errorLog');
const { coldStart } = require('./Utils/coldStartHandler');
admin.findOne({ email: "kumardeepam8600@gmail.com" }, (err, data) => {
    if (err) {
        console.log(err);
    }
    if (data) {
        return;
    }
    else {
        // call coldStart function to create admin data
        coldStart();
    }
});

app.use("/api", require("./Api/api"));

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// // export our app for testing
// module.exports = app;