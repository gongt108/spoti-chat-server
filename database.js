// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
// import our database
const { 
    Game 
} = require('./models'); // automatically looks for the index.js file by default
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

// create a game and print the new game

Game.create({ 
    title: 'Mortal Kombat', 
    publisher: 'Midway', 
    releaseYear: 1992, 
    price: 59, 
    genre: 'fighting',
    rating: 5
})
.then(result => {
    console.log(result);
})
.catch(error => console.log(error));
