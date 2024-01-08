const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Chat, Message } = require('../models');

// GET all posts
router.get('/', async (req, res) => {
	try {
		const foundChatroom = await Chat.findOne({
			users: {
				$all: [
					mongoose.Types.ObjectId.createFromHexString(req.query.user1),
					mongoose.Types.ObjectId.createFromHexString(req.query.user2),
				],
			},
		});
		res.send(foundChatroom);
	} catch (error) {
		console.error(error);
	}
});

// GET one chatroom by ObjectId
router.get('/:id', async (req, res) => {
	try {
		const foundChatroom = await Chat.findById(req.params.id);
		const user1 = await User.findById(foundChatroom.users[0]);
		const user1Name = `${user1.firstName} ${user1.lastName}`;
		const user2 = await User.findById(foundChatroom.users[1]);
		const user2Name = `${user2.firstName} ${user2.lastName}`;

		const messages = await Message.find({
			_id: {
				$in: foundChatroom.messages,
			},
		});

		res.send({
			messages: messages,
			users: foundChatroom.users,
		});
	} catch (error) {
		console.error(error);
	}
});

// POST a new chatroom
router.post('/new', async (req, res) => {
	try {
		const foundChatroom = await Chat.findOne({
			users: {
				$all: [
					mongoose.Types.ObjectId.createFromHexString(req.body.friendId),
					mongoose.Types.ObjectId.createFromHexString(req.body.userId),
				],
			},
		});

		if (foundChatroom) return res.status(409).send('Chatroom already exists');

		const newChatroom = await Chat.create({
			users: [
				mongoose.Types.ObjectId.createFromHexString(req.body.friendId),
				mongoose.Types.ObjectId.createFromHexString(req.body.userId),
			], // get from useAuth
			messages: [],
		});

		res.send(newChatroom);
	} catch (error) {
		console.error(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Chat.findByIdAndRemove(req.params.id);
		const allChatrooms = await Chat.find();
		res.send(allChatrooms);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
