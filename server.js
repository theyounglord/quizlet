// require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
//dotenv is a module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();
// create our express app
const app = express();
// set our port
const port = process.env.PORT || 5000;
// connect to our database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// use body parser to get data from a post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enable cors
app.use(cors());
// set our static files path
app.use(express.static(path.join(__dirname, 'public')));
// set the view engine to ejs
app.set('view engine', 'ejs');
// set the views path
app.set('views', path.join(__dirname, 'views'));
// require our routes
// const routes = require('./routes');
// // use our routes
// app.use('/', routes);
// start our server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    }
);
// export our app for testing
module.exports = app;