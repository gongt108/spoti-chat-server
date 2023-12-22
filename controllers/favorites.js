const express = require('express');
const router = express.Router();

const { Favorite } = require('../models');

// GET all favorites
router.get('/', async (req, res) => {
	try {
		const favoriteData = await Favorite.find().limit(20);
		res.send(favoriteData);
	} catch (error) {
		console.error(error);
	}
});

// GET favorite by search
// router.get('/search', async (req, res) => {
// 	try {
// 		let foundFavorite = await Favorite.findById(req.query.searchTerm);
// 		res.send(foundFavorite);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// GET one favorite
// router.get('/:id', async (req, res) => {
// 	try {
// 		const foundFavorite = await Favorite.findById(req.params.id);
// 		res.send(foundFavorite);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// POST a new favorite
router.post('/new', async (req, res) => {
	try {
		const newFavorite = await Favorite.create({
			userId: req.body.user, // get from useAuth
			favoriteType: req.body.favoriteType,
			spotifyId: req.body.spotifyId, // get from API link
			content: req.body.content,
			likeCount: 0,
			// commentCount: 0,
			trackName: req.body.trackName,
			albumName: req.body.albumName,
			artistName: req.body.artistName,
			imgUrl: req.body.imgUrl,
		});

		res.send(newFavorite);
	} catch (error) {
		console.error(error);
	}
});

// PUT update favorite by ObjectId
router.put('/:id', async (req, res) => {
	try {
		const foundFavorite = await Favorite.findByIdAndUpdate(req.params.id, {
			content: req.body.content,
		});
		const updatedFavorite = await Favorite.findById(foundFavorite._id);
		res.send(updatedFavorite);
	} catch (error) {
		console.error(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Favorite.findByIdAndRemove(req.params.id);
		const allFavorites = await Favorite.find();
		res.send(allFavorites);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
