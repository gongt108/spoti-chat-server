const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get ALL Users
router.get('/', async (req, res) => {
	try {
		const userData = await User.find().limit(20);
		res.send(userData);
	} catch (error) {
		console.error(error);
	}
});

// Get a User
router.get('/:email', async (req, res) => {
	try {
		const foundUser = await User.findOne({email: req.params.email});
		// console.log(req.params.email)
		res.send(foundUser);

	} catch (error) {
		console.error(error);
	}
});

// Create User
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			bio: req.body.bio,
			dateOfBirth: req.body.dateOfBirth,
			friends: [],
		});

		res.send(newUser);
	} catch (error) {
		console.error(error);
	}
});

// Update User
// To Do: isLoggedIn. Can only update user if you are the log user
router.put('/:id', async (req, res) => {
	try {
		const foundUser = await User.findByIdAndUpdate(req.params.id, {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: req.body.password,
			bio: req.body.bio,
			dateOfBirth: req.body.dateOfBirth,
		});
		const updatedUser = await User.findById(foundUser._id);
		res.send(updatedUser);
	} catch (error) {
		console.error(error);
	}
});

// Delete User
// To Do: isLoggedIn. Can only delete user if you are the log user
router.delete('/:id', async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		// once you remove user, show all remaining users
		const allUsers = await User.find();
		res.send(allUsers);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
