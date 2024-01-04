const mongoose = require('mongoose');

let postSchema = new mongoose.Schema(
	{
		userId: String,
		name: String,
		albumName: String,
		artistName: String,
		postType: String,
		spotifyId: String,
		content: String,
		imgUrl: String,
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
