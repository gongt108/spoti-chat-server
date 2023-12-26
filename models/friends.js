const mongoose = require('mongoose');

let friendSchema = new mongoose.Schema({
	user1: {
		type: String,
		required: true,
	},
	user2: {
		type: String,
		required: true,
	},
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
