const faker = require('@faker-js/faker');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

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
        });
});

// GET make a route that queries users by [email domain] [zipCode] [state]
app.get('/users/:field/:value', (req, res) => {
    if (req.params.field === 'zipcode' || req.params.field === 'zipCode') {
        let zipCode = parseInt(req.params.value);
        // find all users based on zipCode
        User.find({ "address.zipCode": zipCode })
            .then((users) => {
                console.log('users', users);
                return res.json({ users: users });
            })
            .catch((error) => {
                console.log('error', error);
                res.json({ message: 'There was an issue, please try again...' });
            });
    } else if (req.params.field === 'email' || req.params.field === 'Email') {
        User.find({ email: req.params.value })
            .then((user) => {
                console.log('user', user);
                return res.json({ user: user });
            })
            .catch((error) => {
                console.log('error', error);
                res.json({ message: 'There was an issue, please try again...' });
            });
    }
});

// // GET make a route that queries a user by email
// app.get('')

// POST route /users/new - create a new user
app.post('/users/new', (req, res) => {
    // read the req.body - data for the new user coming in at
    console.log('data from request (user)', req.body); // object
    // Find a user
    User.findOne({ email: req.body.email })
        .then((user) => {
            // check to see if user exist in database
            if (user) {
                // return a message saying user exist
                res.json({ message: `${user.email} already exists. Please try again` });
            } else {
                // create a user
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    jobTitle: req.body.jobTitle,
                    birthdate: new Date(),
                    "address.streetAddress": req.body.streetAddress,
                    "address.city": req.body.city,
                    "address.state": req.body.state,
                    "address.zipCode": req.body.zipCode,
                    number: req.body.number
                })
                    .then((newUser) => {
                        console.log('new user created ->', newUser);

                        return res.json({ user: newUser });
                    })
                    .catch((error) => {
                        console.log('error', error);
                        return res.json({ message: 'error occured, please try again.' });
                    });
            }
        })
        .catch((error) => {
            console.log('error', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

app.put('/users/:id', (req, res) => {
    const updateQuery = {}
    // check firstName
    if (req.body.firstName) {
        updateQuery.firstName = req.body.firstName
    }
    // check lastName
    if (req.body.lastName) {
        updateQuery.lastName = req.body.lastName
    }
    // check email
    if (req.body.email) {
        updateQuery.email = req.body.email
    }
    // check jobTitle
    if (req.body.jobTitle) {
        updateQuery.jobTitle = req.body.jobTitle
    }
    // check bithdate
    if (req.body.bithdate) {
        updateQuery.bithdate = req.body.bithdate
    }
    // check streetAddress
    if (req.body.streetAddress) {
        updateQuery["address.streetAddress"] = req.body.streetAddress
    }
    // check city
    if (req.body.city) {
        updateQuery["address.city"] = req.body.city
    }
    // check state
    if (req.body.state) {
        updateQuery["address.state"] = req.body.state
    }
    // check zipCode
    if (req.body.zipCode) {
        updateQuery["address.zipCode"]  = req.body.zipCode
    }
    // check number
    if (req.body.number) {
        updateQuery.number = req.body.number
    }

    User.findByIdAndUpdate(req.params.id, {$set: updateQuery }, {new: true})
    .then((user) => {
        return res.json({ message: `${user.email} was updated`, user: user});
    })
    .catch((error) => {
        console.log('error inside PUT /users/:id', error);
        return res.json({ message: 'error occured, please try again.' });
    });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});