const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const config = require('config');
const cors = require('cors')
const app = express();
const passport = require("passport");
const path = require('path');

require('dotenv').config();
require('./models/User');

// Cors
app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
     })
  );

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({extended : false}));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: config.get('SESSION_COOKIE_KEY'),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
 }));

app.use(passport.initialize());
//app.use(passport.session());
require('./services/passport');
require('./services/jwtStrategy')

/* ================ Creating Cookie Key and link with Passport JS: End ================  */

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));


const PORT = config.get('PORT') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));