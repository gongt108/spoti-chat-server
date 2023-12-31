const mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema(
	{
		// userId: {
		// 	type: String,
		// 	required: true,
		// },
		name: {
			type: String,
			required: true,
		},
		favoriteType: {
			type: String,
			required: true,
		},
		spotifyId: {
			type: String,
			required: true,
		},
		imgUrl: String,
	},
	{ timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
