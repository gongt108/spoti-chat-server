const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		bio: String,
		dateOfBirth: String,
		searchHistory: Array,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
