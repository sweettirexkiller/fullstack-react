const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({googleId: profile.id});
    if (user) {
        done(null, user);
    } else {
        await new User({googleId: profile.id, displayName: profile.displayName}).save();
        done(null, user)
    }
}));