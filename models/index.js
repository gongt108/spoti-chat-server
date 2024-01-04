// require('dotenv').config();
// const mongoose = require('mongoose');

// // import all models
// const User = require('./users');
// const Post = require('./posts');

// // console.log('mongo uri =>', process.env.MONGO_URI);

// // connect to the database
// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// // create connection object
// const db = mongoose.connection;

// // once the database opens
// db.once('open', () => {
// 	console.log(
// 		'Connected to MongoDB Database: Mongoose App at HOST: ',
// 		db.host,
// 		'PORT: ',
// 		db.port
// 	);
// });

// // if there is a database error
// db.on('error', (err) => {
// 	console.log(`Database error: `, err);
// });

// // export models
// module.exports = {
// 	User,
// 	Post,
// };

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const  User  = require('./users');
const Post  = require('./posts')

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
  console.log('Connected to MongoDB Database: Mongoose App at HOST: ', db.host, 'PORT: ', db.port);
});

// if there is a database error
db.on('error', (err) => {
  console.log(`Database error: `, err);
});

// Use the authentication routes
//  app.use('/ap/auth', authRoutes);

// Your existing routes for models (User, Post) can go here

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = {User,Post}