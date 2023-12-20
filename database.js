// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
// import our database
const db = require('./models'); // automatically looks for the index.js file by default
