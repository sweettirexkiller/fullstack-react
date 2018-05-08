const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [String],
});

module.exports = mongoose.model('Surveys', schema);