const express = require('express');
const router = express.Router();

const { Post } = require('../models');

// GET all posts
router.get('/', async (req, res) => {
	try {
		const postData = await Post.find().limit(20);
		res.send(postData);
	} catch (error) {
		console.error(error);
	}
});

// GET post by search
// router.get('/search', async (req, res) => {
// 	try {
// 		let foundPost = await Post.findById(req.query.searchTerm);
// 		res.send(foundPost);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// GET one post
// router.get('/:id', async (req, res) => {
// 	try {
// 		const foundPost = await Post.findById(req.params.id);
// 		res.send(foundPost);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// POST a new post
router.post('/new', async (req, res) => {
	try {
		const newPost = await Post.create({
			userId: req.body.user, // get from useAuth
			postType: req.body.postType,
			spotifyId: req.body.spotifyId, // get from API link
			content: req.body.content,
			likeCount: 0,
			// commentCount: 0,
			trackName: req.body.trackName,
			albumName: req.body.albumName,
			artistName: req.body.artistName,
			imgUrl: req.body.imgUrl,
		});

		res.send(newPost);
	} catch (error) {
		console.error(error);
	}
});

// PUT update post by ObjectId
router.put('/:id', async (req, res) => {
	try {
		const foundPost = await Post.findByIdAndUpdate(req.params.id, {
			content: req.body.content,
		});
		const updatedPost = await Post.findById(foundPost._id);
		res.send(updatedPost);
	} catch (error) {
		console.error(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Post.findByIdAndRemove(req.params.id);
		const allPosts = await Post.find();
		res.send(allPosts);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
