const mongoose = require('mongoose'); // odm - object document mapper

// create our game schema
const gameSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    releaseYear: Number,
    genre: String,
    price: Number,
    publisher: String
}, { timestamps: true });

// create the model
const Game = mongoose.model('Game', gameSchema);

// export the model
module.exports = Game;