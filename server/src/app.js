const connect = require('./config/database');
const express = require('express');
const loginController = require('./login/login.controller');
const doorController = require('./manageDoor/manageDoor.controller');
const systemController = require('./system/system.controller');
const hierarchyController = require('./hierarchy/hierarchy.controller');

// load environment variables
require('dotenv').config();

// Connect to database
connect();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
    next();
});

app.get('/', async (req, res) => {
    res.send('Hello there');
});

app.use(loginController);
app.use(hierarchyController);
app.use(doorController);
app.use(systemController);

app.use((req, res, next) => {
    res.sendStatus(404);
});

module.exports = app;