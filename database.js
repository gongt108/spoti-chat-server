// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
// import our models
// console.log('uri', process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;

// connect to database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// create a connection object
const db = mongoose.connection;

// once database connection opens
db.once('open', () => console.log('Connected to facebook database', 'host:', db.host, 'port:', db.port));

// if database has an error
db.on('error', (error) => console.log('database error', error));