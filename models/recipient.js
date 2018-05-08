const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    email: String,
    responded: {type: Boolean, default: false}
});

module.exports = schema;
