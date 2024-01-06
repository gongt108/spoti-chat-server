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
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		bio: String,
		dateOfBirth: String,
		userImage: String,
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

