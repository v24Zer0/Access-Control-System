const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: String,
    name: {type: String, required: true, unique: true},
    parent_area: {type: mongoose.Schema.Types.String, ref: 'Area', default: null},
    child_area_ids: [{type: mongoose.Schema.Types.String, ref: 'Area'}]
} , {_id: false});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;