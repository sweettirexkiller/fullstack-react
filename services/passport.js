const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then(user => {
        if (user) {
            done(null, user);
        } else {
            new User({googleId: profile.id, displayName: profile.displayName}).save().then(user => {
                done(null, user)
            });
        }
    });
}));