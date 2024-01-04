const express = require('express');
const router = express.Router();


const { User, Favorite, Friend } = require('../models');


// Get ALL Users
router.get('/', async (req, res) => {
	try {
		const userData = await User.find().limit(20);
		res.send(userData);
	} catch (error) {
		console.error(error);
	}
});

// GET all friends
router.get('/:id/allFriends', async (req, res) => {
	try {
		let saved1 = await Friend.find({
			user1: req.params.id,
		});
		if (saved1) {
			saved1 = saved1.map((friend) => {
				return friend.user2;
			});
		}
		// if (foundFriend.length === 0) return res.send('Friend already removed');
		let saved2 = await Friend.find({
			user2: req.params.id,
		});
		if (saved2) {
			saved2 = saved2.map((friend) => {
				return friend.user1;
			});
		}

		// const friendsList = [...saved1, ...saved2];

		const friendsData = await User.find({
			_id: { $in: [...saved1, ...saved2] },
		});
		res.send(friendsData);
	} catch (error) {
		console.error(error);
	}
});

// GET all favs
router.get('/:id/bookmarks', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		if (!foundUser) return res.json({ message: 'User not found' });

		console.log(foundUser.favorites);

		const favorites = await Favorite.find({
			_id: { $in: foundUser.favorites },
		});
		console.log(favorites);
		res.send(favorites);
	} catch (error) {
		console.error(error);
	}
});

// Get a User
router.get('/:email', async (req, res) => {
	try {
		const foundUser = await User.findOne({email: req.params.email});
		res.send(foundUser);

	} catch (error) {
		console.error(error);
	}
});

// Create User
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			bio: req.body.bio,
			dateOfBirth: req.body.dateOfBirth,
			friends: [],
			favorites: [],
		});

		res.send(newUser);
	} catch (error) {
		console.error(error);
	}
});

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
			favoriteType: req.body.favoriteType,
			spotifyId: req.body.spotifyId, // get from API link
			name: req.body.name,
			imgUrl: req.body.imgUrl,
		});
		foundUser.favorites = [...foundUser.favorites, newFavorite._id];
		await foundUser.save();
		res.send(foundUser);
	} catch (error) {
		console.error(error);
	}
});

router.post('/:id/friend', async (req, res) => {
	try {
		if (req.params.id === req.body.userId)
			return res.send('Cannot add yourself');

		const user1 = await User.findById(req.params.id);
		const user2 = await User.findById(req.body.userId);

		const foundFriend = await Friend.find({
			$or: [
				{
					user1: req.params.id,
					user2: req.body.userId,
				},
				{
					user2: req.params.id,
					user1: req.body.userId,
				},
			],
		});
		if (foundFriend.length) return res.send('Friend already added');

		const newFriendRel = await Friend.create({
			user1: user1._id,
			user2: user2._id,
		});

		res.send(newFriendRel);
	} catch (error) {
		console.error(error);
	}
});

// Update User
// To Do: isLoggedIn. Can only update user if you are the log user
router.put('/:id', async (req, res) => {
	try {
		const foundUser = await User.findByIdAndUpdate(req.params.id, {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: req.body.password,
			bio: req.body.bio,
			dateOfBirth: req.body.dateOfBirth,
		});
		const updatedUser = await User.findById(foundUser._id);
		res.send(updatedUser);
	} catch (error) {
		console.error(error);
	}
});

router.delete('/:id/unsave', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		if (!foundUser) return res.json({ message: 'User not found' });

		const favoriteToRemove = await Favorite.find({
			_id: { $in: foundUser.favorites },
			spotifyId: req.body.spotifyId,
		});
		await User.findByIdAndUpdate(req.params.id, {
			$pullAll: { favorites: [favoriteToRemove[0]?._id] },
		});
		await Favorite.findByIdAndRemove(favoriteToRemove[0]?._id);
		// await User.findByIdAndUpdate(req.params.id, {$pullAll: {favorites: [favoriteToRemove[0]?._id]}})
		const favorites = await Favorite.find();
		res.send(favorites);
	} catch (error) {
		console.error(error);
	}
});

router.delete('/:id/unfriend', async (req, res) => {
	try {
		const foundFriend = await Friend.find({
			$or: [
				{
					user1: req.params.id,
					user2: req.body.userId,
				},
				{
					user2: req.params.id,
					user1: req.body.userId,
				},
			],
		});
		if (foundFriend.length === 0) return res.send('Friend already removed');
		// const saved2 = await Friend.find({
		// 	user2: req.params.id,
		// 	user1: req.body.userId,
		// });
		// const friendsList = [...saved1, ...saved2];
		// console.log(friendsList);
		await Friend.findByIdAndRemove(foundFriend[0]._id);
		// once you remove user, show all remaining users
		const allFriendRels = await Friend.find();
		res.send(allFriendRels);

		// if (foundUser.friends.includes(req.body.userId)) {
		// 	const foundFriend = await Friend.findOne({ userId: req.body.userId });
		// 	// console.log(foundFriend);
		// 	foundUser.friends = foundUser.friends.filter((friend) => {
		// 		console.log(friend !== foundFriend._id);
		// 		return friend !== foundFriend.userId;
		// 	});
		// 	await foundUser.save();
		// 	res.send(foundUser);
		// }
		// if (!foundFriend) return res.json({ message: 'No longer following user.' });
	} catch (error) {
		console.error(error);
	}
});

// Delete User
// To Do: isLoggedIn. Can only delete user if you are the log user
router.delete('/:id', async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		// once you remove user, show all remaining users
		const allUsers = await User.find();
		res.send(allUsers);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
