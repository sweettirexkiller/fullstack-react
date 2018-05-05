//required packages
const express = require('express');
const morganLogger = require('morgan');
const keys = require('./config/keys');
const mongoose = require('mongoose');

// Tell mongoose to use these schemas:
require('./models/user');

// Configuring strategies for authentication
require('./services/passport');

// App initialization
const app = express();

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