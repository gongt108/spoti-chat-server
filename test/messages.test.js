const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User, Chat, Message, Favorite } = require('../models');

const userId = '6587314c0e29b38d86c8ae39';
const chatroomId = '65991765e834f1b9ddb91140';
let messageId;

describe('Messages Controller', function () {
	describe('GET /messages', function () {
		it('should return a 200 response', function (done) {
			request(app).get('/messages').expect(200, done);
		});
	});

	describe('POST /messages/:chatroomId/new', function () {
		const newMessage = {
			sender: '6587314c0e29b38d86c8ae39',
			senderName: 'Tiffany Gong',
			content: 'This is a test',
			chatroomId: chatroomId,
		};

		it('should return a 200 response on success', function (done) {
			request(app)
				.post(`/messages/${chatroomId}/new`)
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send(newMessage)
				.expect(200, done);
		});
	});
});
