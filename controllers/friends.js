const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Friend, Chat } = require('../models');

router.get('/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		const friendIds = foundUser.friends.map((friend) => {
			return friend._id.toString();
		});

		const friendsData = await User.find({
			_id: { $in: friendIds },
		});
		res.send(friendsData);
	} catch (error) {
		console.error(error);
	}
});

router.post('/:id/add', async (req, res) => {
	try {
		if (req.params.id === req.body.userId)
			return res.status(409).send('Cannot add yourself');

		const user1 = await User.findById(req.params.id);
		const user2 = await User.findById(req.body.userId);

		const foundFriend = await Friend.findOne({
			users: {
				$all: [
					mongoose.Types.ObjectId.createFromHexString(req.params.id),
					mongoose.Types.ObjectId.createFromHexString(req.body.userId),
				],
			},
		});
		if (foundFriend) return res.status(409).send('Friend already added');

		const newFriendRel = await Friend.create({
			users: [
				mongoose.Types.ObjectId.createFromHexString(req.params.id),
				mongoose.Types.ObjectId.createFromHexString(req.body.userId),
			],
		});

		user1.friends = [
			...user1.friends,
			mongoose.Types.ObjectId.createFromHexString(req.body.userId),
		];
		await user1.save();

		user2.friends = [
			...user2.friends,
			mongoose.Types.ObjectId.createFromHexString(req.params.id),
		];
		await user2.save();

		const newChatroom = await Chat.create({
			users: [
				mongoose.Types.ObjectId.createFromHexString(req.params.id),
				mongoose.Types.ObjectId.createFromHexString(req.body.userId),
			], // get from useAuth
			messages: [],
		});

		res.send(newFriendRel);
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

module.exports = router;
