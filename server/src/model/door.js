const mongoose = require('mongoose');
const Area = require('./area');

const doorSchema = mongoose.Schema({
    _id: String,
    name: {type: String, required: true},
    parent_area: {type: mongoose.Schema.Types.String, ref: 'Area', required: true},
    status: {type: String, default: "open"}
}, {_id: false});

const Door = mongoose.model('Door', doorSchema);

module.exports = Door;