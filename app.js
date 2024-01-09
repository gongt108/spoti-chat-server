require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');
const SpotifyWebApi = require('spotify-web-api-node');
const REDIRECT_URI = process.env.REDIRECT_URI;

// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.json({ message: `Test 2 ${REDIRECT_URI}` });
});

// import controllers
app.use('/posts', require('./controllers/posts'));
app.use('/users', require('./controllers/users'));
app.use('/friends', require('./controllers/friends'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/chats', require('./controllers/chats'));
app.use('/messages', require('./controllers/messages'));

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: REDIRECT_URI,
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
		redirectUri: REDIRECT_URI,
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

// Real time chat using socket.io
const http = require('http');
const server = http.createServer(app);
server.listen(4000, () => console.log(`Listening on port ${PORT}`));

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = socket(server, {
	cors: {
		origin: '*',
		// credentials: true,
		methods: ['GET', 'POST'],
	},
});

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

// global.onlineUsers = new Map();

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
	console.log(`User connected ${socket.id}`);

	socket.on('join-room', (room) => {
		socket.join(room);
		console.log(`User joined room ${room}`);
	});
	socket.on('send-message', (message, room) => {
		socket.emit('receive-message', message);
		console.log(room);
	});

	socket.on('disconnect', () => {
		console.log(`Socket ${socket.id} disconnected`);
	});
});

module.exports = app;
