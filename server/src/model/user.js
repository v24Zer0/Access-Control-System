const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;