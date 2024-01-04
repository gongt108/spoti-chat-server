const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		content: { type: String, trim: true },
		chatroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
