// import the server
const app = require('../app'); // make the server is exported from app.js
// what's needed for testing
const request = require('supertest');
const expect = require('chai').expect;
// import the game model
const { Game } = require('../models');

// import faker
const { faker } = require('@faker-js/faker');

test home route
describe('GET /', () => {
    it('returns a 200 response', (done) => {
        request(app).get('/')
        .expect(200, done);
    });
});

