const mongoose = require('mongoose');
const Door = require('./door');

const accessSchema = mongoose.Schema({
    _id: String,
    name: {type: String, required: true, unique: true},
    doors: [{type: mongoose.Schema.Types.String, ref: 'Door'}]
}, {_id: false, collection: 'access_rules'});

const Access = mongoose.model('Access', accessSchema);

module.exports = Access;