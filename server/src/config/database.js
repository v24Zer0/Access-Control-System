const mongoose = require('mongoose');
const User = require('../model/user');
const Area = require('../model/access');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log('Database Connection Successful');
    } catch(error) {
        console.log('Database Connection Failed');
    }
}

module.exports = connect;