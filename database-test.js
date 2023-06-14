// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { createRandomUser } = require('./utils');

// import our models
const User = require('./models/user');

console.log('mongo uri =>', process.env.MONGO_URI);
// connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

// create a user and save to the DB
User.create(createRandomUser())
.then((user) => {
    console.log('create user',user);
})
.catch((error) => {
    console.log('error', error);
});

// create 100 users
// for (let i = 0; i < 100; i++) {
//     User.create(createRandomUser())
//     .then((user) => {
//         console.log(i, user);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });
// }