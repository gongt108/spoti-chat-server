const mongoose = require('mongoose');

let postSchema = new mongoose.Schema(
	{
		userId: String,
		postType: String,
		spotifyId: String,
		content: String,
		likeCount: Number,
		commentCount: Number,
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
