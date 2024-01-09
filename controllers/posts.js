const express = require('express');
const router = express.Router();

const { Post } = require('../models');

// GET all posts
router.get('/', async (req, res) => {
	try {
		const postData = await Post.find().sort({ createdAt: -1 }).limit(20);
		res.send(postData);
	} catch (error) {
		console.error(error);
	}
});

router.get('/:userId', async (req, res) => {
	try {
		const postData = await Post.find({ userId: req.params.userId })
			.sort({ createdAt: -1 })
			.limit(20);
		res.send(postData);
	} catch (error) {
		console.error(error);
	}
});

// POST a new post
router.post('/new', async (req, res) => {
	try {
		const newPost = await Post.create({
			userId: req.body.userId, // get from useAuth
			postType: req.body.type,
			spotifyId: req.body.spotifyId, // get from API link
			content: req.body.content,
			likeCount: 0,
			// commentCount: 0,
			name: req.body.name,
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
