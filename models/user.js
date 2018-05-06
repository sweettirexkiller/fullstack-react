const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: {type: String, required: true},
    displayName: {type: String, required: true}
});

mongoose.model('User', userSchema); // We are not exporting this model because
                                    // it sometimes makes problems in testing environment