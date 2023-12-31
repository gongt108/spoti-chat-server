require('dotenv').config();
const faker = require('@faker-js/faker');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'your-secret-key', // Replace with a secure secret
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Passport strategy (you can put this in a separate file if needed)
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, cb) => {
			db.user
				.findOne({ email })
				.then((user) => {
					if (!user || !user.validPassword(password)) {
						return cb(null, false);
					}

					// Your additional authentication logic goes here
					// For example, check user roles, update last login timestamp, etc.

					return cb(null, user);
				})
				.catch((err) => cb(err));
		}
	)
);

// Passport serialization and deserialization (you can put this in a separate file if needed)
passport.serializeUser((user, cb) => {
	cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
	// Retrieve user from the database based on the id
	// This may vary based on your database setup
});

app.get('/', (req, res) => {
	return res.json({ message: 'Welcome to the Spoti-Chat App' });
});

// import controllers
app.use('/posts', require('./controllers/posts'));
app.use('/users', require('./controllers/users'));

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			console.log(data.body);
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

// spotify login to get access token
app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_SECRET,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server connected to PORT: ${PORT}`);
});

module.exports = app;
