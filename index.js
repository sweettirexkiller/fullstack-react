//required packages
const express = require('express');
const cookieSession = require('cookie-session'); // vs express-session that uses sessions in the 'session store' (for a bigger app)
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

// Tell express how to use cookies and sessions <-- this is additional middleware
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// Tell express that passport can use sessions <-- this are additional middlewares
app.use(passport.initialize());
app.use(passport.session()); // it creates 'passport' session

// Terminal incoming requests logger <-- this is additional middleware
app.use(morganLogger('dev'));

// Database connection
mongoose.connect(keys.mongoURI);

// Routes for authentication
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Server port activation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});