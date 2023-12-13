// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
// import our database
const { 
    Game 
} = require('./models'); // automatically looks for the index.js file by default

// create a game and print the new game
Game.create({ 
    title: 'NBA 2k', 
    publisher: '---', 
    releaseYear: 2023, 
    price: 69, 
    genre: 'sports',
    rating: 4.5
})
.then(result => {
    console.log(result);
})
.catch(error => console.log(error));
