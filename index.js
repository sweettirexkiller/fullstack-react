//required packages
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morganLogger = require('morgan');
const keys = require('./config/keys');
const mongoose = require('mongoose');

// Tell mongoose to use these schemas:
require('./models/user');

// Configuring strategies for authentication with passport
require('./services/passport');

// App initialization
const app = express();

// Tell express how to use cookies and sessions
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// Tell express that passport can use sessions
app.use(passport.initialize());
app.use(passport.session());

// Terminal incoming requests logger
app.use(morganLogger('dev'));

// Database connection
mongoose.connect(keys.mongoURI);

// Routes for authentication
require('./routes/authRoutes')(app);

// Server port activation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});