const faker = require('@faker-js/faker');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// import models
const { User } = require('./models');

// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

// GET make a users route to get all users
app.get('/users', (req, res) => {
    User.find({})
    .then((users) => {
        console.log('users', users);
        res.json({ users: users });
    })
    .catch((error) => {
        console.log('error', error);
        res.json({ message: 'There was an issue, please try again...' });
    })
});

// GET make a route that queries users by [email domain] [zipCode] [state]
app.get('/users/:field/:value', (req, res) => {
    if (req.params.field === 'zipcode' || req.params.field === 'zipCode') {
        let zipCode = parseInt(req.params.value);
        // find all users based on zipCode
        User.find({ "address.zipCode": zipCode})
        .then((users) => {
            console.log('users', users);
            res.json({ users: users });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        })
    }
});
// GET make a route that queries a user by email

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});