const express = require('express');
const router = express.Router();

// import the Post model
const { Post } = require('../models');

// GET route for /posts
router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            if (posts) {
                return res.json({ posts: posts });
            } else {
                return res.json({ message: 'No posts exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /posts/:id
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                return res.json({ post: post });
            } else {
                return res.json({ message: 'No post exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /posts/new
router.post('/new', (req, res) => {
    const newPost = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        username: req.body.username,
        content: req.body.content
    };
    Post.create(newPost)
        .then(post => {
            if (post) {
                console.log('new post was created (object)', post);
                return res.json({ post: post });
            } else {
                return res.json({ message: 'No post exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.post('/:id/comments/new', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post) {
                // add a comment to the post
                const newComment = { username: req.body.username, header: req.body.header, body: req.body.body };
                post.comments.push(newComment);
                // save the post 
                post.save()
                    .then(result => {
                        console.log('After comment is saved', result);
                        return res.json({ post: result });
                    })
                    .catch(error => {
                        console.log('error', error);
                        return res.json({ message: 'No comment created' });
                    });
            } else {
                console.log('did not find post');
                return res.json({ message: 'No posts found' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;