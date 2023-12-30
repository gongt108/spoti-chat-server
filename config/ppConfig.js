const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure

// Passport "serializes" objects to make them easy to store, converting the user to an identifier (id)
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Passport "deserializes" objects by taking the user's serialization (id) and looking it up in the database
passport.deserializeUser((id, cb) => {
  User.findById(id).then(user => {
    cb(null, user);
  }).catch(cb);
});

// This is Passport's strategy to provide local authentication.
// Configuration: An object of data to identify our authentication fields, the username and password
// Callback function: A function that's called to log the user in.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  // Using Mongoose's findOne to find a user by email
  User.findOne({
    email: email
  }).then(user => {
    // If no user or the password is invalid, return false
    if (!user || !bcrypt.compareSync(password, user.password)) {
      cb(null, false);
    } else {
      // If user found and password is valid, return the user
      cb(null, user);
    }
  }).catch(cb);
}));

// Export the Passport configuration from this module
module.exports = passport;
