require('dotenv').config();
const mongoose = require('mongoose');

// import all models
const User = require('./users');
const Favorite = require('./favorites');
const Friend = require('./friends');
const Post = require('./posts');
const Chat = require('./chats');
const Message = require('./messages');


// connect to the database
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
	console.log(
		'Connected to MongoDB Database: Mongoose App at HOST: ',
		db.host,
		'PORT: ',
		db.port
	);
});

// if there is a database error
db.on('error', (err) => {
	console.log(`Database error: `, err);
});


// export models
module.exports = {
	User,
	Post,
	Favorite,
	Friend,
	Chat,
	Message,
};

