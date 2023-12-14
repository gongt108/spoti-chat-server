// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
// import our database
const { 
    Game 
} = require('./models'); // automatically looks for the index.js file by default

// create a game and print the new game
Game.create({ 
    title: 'FIFA', 
    publisher: 'EA Sports', 
    releaseYear: 2024, 
    price: 69, 
    genre: 'sports',
    rating: 4.7
})
.then(result => {
    console.log(result);
    /**
     * result
    {
        title: 'FIFA',
        rating: 4.7,
        releaseYear: 2024,
        genre: 'sports',
        price: 69,
        publisher: 'EA Sports',
        _id: new ObjectId("657a6eede59253c578b4e3c4"),
        createdAt: 2023-12-14T02:56:45.456Z,
        updatedAt: 2023-12-14T02:56:45.456Z,
        __v: 0
    }
    */
})
.catch(error => console.log(error));
