const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User, Chat, Message, Favorite } = require('../models');

const userId = '6587314c0e29b38d86c8ae39';
let chatId;

describe('Chats Controller', function () {
	describe('GET /chats', function () {
		const users = {
			user1: '6594daf352391c4912cec391',
			user2: '6594dbf752391c4912cec393',
		};
		it('should return a 200 response', function (done) {
			request(app).get('/favorites').send(users).expect(200, done);
		});
	});

	describe('POST /chats/new', function () {
		const newChatroom = {
			friendId: '6594daf352391c4912cec391',
			userId: '6594dbf752391c4912cec393',
		};

		it('should return a 200 response on success', function (done) {
			request(app)
				.post(`/chats/new`)
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send(newChatroom)
				.expect(200, done);
		});

		it('should return a 409 response if favorite already exists', function (done) {
			request(app)
				.post(`/chats/new`)
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send(newChatroom)
				.expect(409, done);
		});
	});

	describe('DELETE /:id', () => {
		// Create a test user before the tests
		before(async () => {
			const newChatroom = new Chat({
				friendId: '6594daf352391c4912cec391',
				userId: '659995a080b597a238461f1c',
			});
			const savedChatroom = await newChatroom.save();
			chatId = savedChatroom._id;
		});

		// Delete the test user after the tests
		// after(async () => {
		// 	await Game.findByIdAndDelete(createdGameId);
		// });

		it('finds a favorite by id and deletes', async () => {
			try {
				const response = await request(app).delete(`/chats/${chatId}`);

				expect(response.status).to.equal(200);
			} catch (error) {
				console.error('Test error:', error);
				throw error;
			}
		});
	});
});
