const express = require('express');
const router = express.Router();
// import the Game Model
const { Game } = require('../models');

// Creating routes that allow to 
// 1. return an array of games [ {}, {}, {} ]
// 2. return a game based on ObjectId
// 3. return a game based on a search input
// 4. create a game and return an object of the new game
// 5. update a game by the ObjectId
// 6. remove a game and return back to all games

// ---------------------------------
// GET /games - return all games
// ---------------------------------
router.get('/', (req, res) => { /* what goes inside function */ });

// ------------------------------------------
// GET /games/:id - return one game ObjectId
// ------------------------------------------
router.get('/:id', (req, res) => { /* what goes inside function */ });

// --------------------------------------------------------
// GET /games/search - return one game by off search query
// --------------------------------------------------------
router.get('/search', (req, res) => { /* what goes inside function */ });

// --------------------------------------------------------
// POST /games/new - create one game and return new game
// --------------------------------------------------------
router.post('/new', (req, res) => { /* what goes inside function */ });

// --------------------------------------------------------
// PUT /games/:id - update game by using ObjectId
// --------------------------------------------------------
router.put('/:id', (req, res) => { /* what goes inside function */ });

// --------------------------------------------------------------------------------
// DELETE /games/:id - remove game by using ObjectId and return back to all games
// --------------------------------------------------------------------------------
router.delete('/:id', (req, res) => { /* what goes inside function */ });

module.exports = router;