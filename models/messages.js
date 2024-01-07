const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		senderName: { type: String, require: true },
		content: { type: String, trim: true, require: true },
		chatroomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			require: true,
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
