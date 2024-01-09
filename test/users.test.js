const app = require('../app'); // make the server is exported from app.js
const { User } = require('../models');
const request = require('supertest');
const expect = require('chai').expect;
// import faker
const { faker } = require('@faker-js/faker');

let userId;
let randomEmail;
// test POST route
describe('POST /users', () => {
	it('should create a new user and have valid email', (done) => {
		randomEmail = faker.internet.email();

		try {
			// console.log(randomEmail);
			const response = request(app)
				.post('/users/signup')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send({
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					username: faker.internet.userName(),
					email: randomEmail,
					password: faker.internet.password(),
				});
			console.log('new user created', response);
			expect(response._data.email).to.be.equal(randomEmail);
			done();
		} catch (error) {
			console.log('error', error);
			throw error;
		}
	});

	it('returns a 200 response', (done) => {
		const randomEmail = faker.internet.email();
		request(app)
			.post('/users/signup')
			.type('form')
			.send({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				username: faker.internet.userName(),
				email: randomEmail,
				password: faker.internet.password(),
			})
			.expect(200, done);
	});
});

describe('GET /', () => {
	it('returns a 200 response', (done) => {
		request(app).get('/').expect(200, done);
	});
});

// test users
describe('GET /users', () => {
	it('returns a 200 response', (done) => {
		request(app).get('/users').expect(200, done);
	});
	it('returns a user with email', (done) => {
		request(app)
			.get('/users')
			.then((result) => {
				// console.log('result', result._body[0]);
				expect(result._body[0]).to.have.property('email');
				done();
			});
	});
	it('should have more than 1 user', (done) => {
		request(app)
			.get('/users')
			.then((result) => {
				// console.log('result', result._body);
				expect(result._body.length).to.be.above(1); // expect(10).to.be.above(5);
				done();
			});
	});
});

// PUT /users/:id
// describe('PUT /users/:id', () => {
// 	it('should update an existing user phone number', (done) => {
// 		// create a new user

// 	let newUser = createRandomUser();
// 	// newUser = { ...newUser, ...newUser.address };
// 	delete newUser.address;
// 	request(app)
// 		.post('/users/new')
// 		.type('form')
// 		.send(newUser)
// 		.then((response) => {
// 			console.log('new user created', response._body);
// 			const userId = response._body._id;
// 			console.log('--- userId ---', userId);
// 			const randomNumber = faker.phone.number().toString();
// 			console.log('randomNumber', randomNumber);
// 			// Find the new user and update
// 			request(app)
// 				.put(`/users/${userId}`)
// 				.type('form')
// 				.send({
// 					phoneNumber: randomNumber,
// 				})
// 				.then((updatedResponse) => {
// 					console.log('updatedResponse', updatedResponse._body);
// 					expect(updatedResponse._body.phoneNumber).to.be.equal(randomNumber);
// 					done();
// 				})
// 				.catch((error) => {
// 					console.error('error', error);
// 					throw error;
// 				});
// 		})
// 		.catch((error) => {
// 			console.log('error', error);
// 			throw error;
// 		});
// });

// 	it('returns a 200 response', (done) => {
// 		// create a new user
// 		let newUser = createRandomUser();
// 		newUser = { ...newUser, ...newUser.address };
// 		delete newUser.address;

// 		request(app)
// 			.post('/users/new')
// 			.type('form')
// 			.send(newUser)
// 			.then((response) => {
// 				console.log('new user created', response._body);
// 				const userId = response._body._id;

// 				console.log('--- userId ---', userId);
// 				const randomNumber = faker.phone.number();
// 				// Find the new user and update
// 				request(app)
// 					.put(`/users/${userId}`)
// 					.type('form')
// 					.send({
// 						number: randomNumber,
// 					})
// 					.expect(200, done);
// 			})
// 			.catch((error) => {
// 				console.log('error', error);
// 				throw error;
// 			});
// 	});
// });
// DELETE
describe('DELETE /users/:id', () => {
	// create a new user

	before(async () => {
		let newUser = new User(createRandomUser());
		const savedUser = await newUser.save();
		userId = savedUser._id;
	});
	it('returns a 200 response after deleting user', async () => {
		try {
			const response = await request(app).delete(`/users/${userId}`);

			expect(response.status).to.equal(200);
		} catch (error) {
			console.error('Test error:', error);
			throw error;
		}
	});
});

function createRandomUser() {
	randomEmail = faker.internet.email();
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		username: faker.internet.userName(),
		email: randomEmail,
		password: faker.internet.password(),
		bio: 'Winning',
		dateOfBirth: '9/21/1959',
	};
}
