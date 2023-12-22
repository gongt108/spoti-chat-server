const mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema(
	{
		userId: String,
		trackName: String,
		albumName: String,
		artistName: String,
		favoriteType: String,
		spotifyId: String,
		content: String,
		imgUrl: String,
	},
	{ timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
