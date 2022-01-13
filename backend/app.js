require('dotenv').config();

const express = require('express');

const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { nextTick } = require('process');

//----------------------------------------
// Check for requried environment variables
const env = ['MONGO_URL'];

for (let i = 0; i < env.length; i++) {
    if (!process.env[env[i]]) {
        console.log("Missing environment variable:  " + env[i]);
        process.exit();
    }
}


const app = express();

app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

if (process.env.NODE_ENV != 'test') {
    app.use(logger('dev'));
}

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());



app.use(session({
    secret: 'f892ac31b46f4375863fa3a4f523a822',
    store: new MongoStore({
        url: process.env.MONGO_URL
    })
}));


app.use('/api/users', require('./routes/users'));
//app.use('/api/staff', require('./routes/staff'));
//app.use('/api/tutors', require('./routes/tutors'));
//app.use('/api/rooms', require('./routes/rooms'));
//app.use('/api/sections', require('./routes/sections'));
//app.use('/api/tutoring', require('./routes/tutoring'));
app.use('/api/auth', require('./routes/authentication'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.enable('trust proxy');

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });

module.exports = app;