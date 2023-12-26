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
		searchHistory: [String],
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
	},
	{ timestamps: true }
);

// let favoriteSchema = new mongoose.Schema(
// 	{
// 		// userId: {
// 		// 	type: String,
// 		// 	required: true,
// 		// },
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		favoriteType: {
// 			type: String,
// 			required: true,
// 		},
// 		spotifyId: {
// 			type: String,
// 			required: true,
// 		},
// 		imgUrl: String,
// 	},
// 	{ timestamps: true }
// );

const User = mongoose.model('User', userSchema);

module.exports = User;
