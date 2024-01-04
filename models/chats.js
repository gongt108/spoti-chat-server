const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema(
	{
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
	},
	{ timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
