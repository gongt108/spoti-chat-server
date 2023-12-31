const express = require('express');
const router = express.Router();

const { User, Favorite } = require('../models');

// GET all favorites
router.get('/', async (req, res) => {
	try {
		const data = await Favorite.find().sort({ createdAt: -1 });
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

// router.get('/:id/bookmarks', async (req, res) => {
// 	try {
// 		const foundUser = await User.findById(req.params.id);
// 		if (!foundUser) return res.json({ message: 'User not found' });

// 		console.log(foundUser.favorites);

// 		const favorites = await Favorite.find({
// 			_id: { $in: foundUser.favorites },
// 		});
// 		console.log(favorites);
// 		res.send(favorites);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// POST favorites
router.post('/:id/save', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		if (!foundUser) return res.json({ message: 'User not found' });
		const existingFavorite = await Favorite.find({
			_id: { $in: foundUser.favorites },
			spotifyId: req.body.spotifyId,
		});

		if (existingFavorite.length > 0) return res.send('Item previously saved.');

		const newFavorite = await Favorite.create({
			// userId: req.body.id,
			type: req.body.type,
			spotifyId: req.body.spotifyId, // get from API link
			name: req.body.name,
			imgUrl: req.body.imgUrl,
			albumName: req.body.albumName,
			artistName: req.body.artistName,
			isFavorited: true,
		});
		foundUser.favorites = [...foundUser.favorites, newFavorite._id];
		await foundUser.save();
		res.send(foundUser);
	} catch (error) {
		console.error(error);
	}
});

// DELETE favorite by id
router.delete('/:id', async (req, res) => {
	try {
		await Favorite.findByIdAndRemove(req.params.id);
		const allFavorites = await Favorite.find();
		res.send(allFavorites);
	} catch (error) {
		console.error('Favorite not found', error);
	}
});

module.exports = router;
