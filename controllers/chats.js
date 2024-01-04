const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Chat } = require('../models');

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

		res.send({
			messages: foundChatroom.messages,
			user1Id: user1._id,
			user2Id: user2._id,

			user1Name: user1Name,
			user2Name: user2Name,
		});
	} catch (error) {
		console.error(error);
	}
});

// POST a new chatroom
router.post('/new', async (req, res) => {
	try {
		const newChatroom = await Chat.create({
			users: [req.body.friendId, req.body.userId], // get from useAuth
			messages: [],
		});

		res.send(newChatroom);
	} catch (error) {
		console.error(error);
	}
});

// PUT update post by ObjectId
// router.put('/:id', async (req, res) => {
// 	try {
// 		const foundPost = await Chat.findByIdAndUpdate(req.params.id, {
// 			$push: { messages: req.body.content },
// 		});
// 		const updatedPost = await Chat.findById(foundPost._id);
// 		res.send(updatedPost);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

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
