const mongoose = require('mongoose');

let friendSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		imgUrl: String,
	},
	{ timestamps: true }
);

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
