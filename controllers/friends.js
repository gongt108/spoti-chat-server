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
			return res.send('Cannot add yourself');

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
		if (foundFriend) return res.send('Friend already added');

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

module.exports = router;
