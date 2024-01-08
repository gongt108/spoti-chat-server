const express = require('express');
const router = express.Router();

const { Message, Chat } = require('../models');

// GET all messages
router.get('/', async (req, res) => {
	try {
		const messageData = await Message.find();
		res.send(messageData);
	} catch (error) {
		console.error(error);
	}
});

// POST a new message
router.post('/:chatroomId/new', async (req, res) => {
	try {
		const newMessage = await Message.create({
			sender: req.body.userId, // get from useAuth
			senderName: req.body.senderName,
			content: req.body.content,
			chatroomId: req.body.chatroomId,
		});

		const chatroom = await Chat.findByIdAndUpdate(req.params.chatroomId, {
			$push: { messages: newMessage._id },
		});

		res.send(chatroom);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
