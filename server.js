// set up server
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
const { coldStart } = require('./Utils/coldStartHandler');
coldStart();

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// // export our app for testing
// module.exports = app;