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


// READ A GAME
// ------------------------------------
// READ: find all games 
// ------------------------------------
Game.find({})
.then(games => {
    console.log('--- games ---\n', games);
})
.catch(error => {
    console.log('--- read all games error ---\n', error);
});

// ------------------------------------
// READ: find all games released in 2024
// ------------------------------------
Game.find({ releaseYear: 2024 })
.then(games => {
    console.log('--- games releaseYear 2024 ---\n', games);
})
.catch(error => {
    console.log('--- read error releaseYear ---\n', error);
});

// ------------------------------------------
// READ: find one game - NBA 2K Kobe Edition
// ------------------------------------------
Game.findOne({ title: 'NBA 2K Kobe Edition' })
.then(game => {
    console.log('--- games title NBA 2K Kobe Edition ---\n', game);
})
.catch(error => {
    console.log('--- read NBA 2K... error ---\n', error);
});

// ----------------------------------------------
// READ: find one game - find it by the ObjectId
// ----------------------------------------------
Game.findOne({ _id: "657506e161b1d1b53aa0ff18" })
.then(game => {
    console.log('--- games search by ObjectId ---\n', game);
    /**
     * game
     --- games search by ObjectId ---
    {
        _id: new ObjectId("657506e161b1d1b53aa0ff18"),
        title: 'NBA 2K Kobe Edition',
        releaseYear: 2024
    }
    */
})
.catch(error => {
    console.log('--- read NBA 2K... error ---\n', error);
});