const faker = require('@faker-js/faker');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./controllers/users'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});