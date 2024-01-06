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
		type: {
			type: String,
			required: true,
		},
		spotifyId: {
			type: String,
			required: true,
		},
		albumName: String,
		artistName: String,
		imgUrl: String,
		isFavorited: Boolean,
	},
	{ timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
