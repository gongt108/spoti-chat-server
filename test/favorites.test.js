const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const { User, Chat, Message, Favorite } = require('../models');

const userId = '6587314c0e29b38d86c8ae39';
let favoriteId;

describe('Favorites Controller', function () {
	describe('GET /favorites', function () {
		it('should return a 200 response', function (done) {
			request(app).get('/favorites').expect(200, done);
		});
	});

	describe('POST /favorites/:id/save', function () {
		const newFavorite = {
			type: 'track',
			spotifyId: '2qQpFbqqkLOGySgNK8wBXt', // get from API link
			name: 'FANCY',
			imgUrl:
				'https://i.scdn.co/image/ab67616d0000b273ff7c2dfd0ed9b2cf6bf9c818',
			albumName: 'FANCY',
			artistName: 'TWICE',
			isFavorited: true,
		};
		it('should return a 200 response on success', function (done) {
			request(app)
				.post(`/favorites/${userId}/save`)
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send(newFavorite)
				.expect(200, done);
		});

		it('should return a 409 response if favorite already exists', function (done) {
			request(app)
				.post(`/favorites/${userId}/save`)
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send(newFavorite)
				.expect(409, done);
		});
	});

	describe('DELETE /:id', () => {
		// Create a test user before the tests
		before(async () => {
			const newFavorite = new Favorite({
				type: 'track',
				spotifyId: '63irPUP3xB74fHdw1Aw9zR', // get from API link
				name: 'MANIAC',
				imgUrl:
					'https://i.scdn.co/image/ab67616d0000b2733613e1e0d35867a0814005a9',
				albumName: 'MANIAC',
				artistName: 'Stray Kids',
				isFavorited: true,
			});

			const savedFavorite = await newFavorite.save();
			favoriteId = savedFavorite._id;
		});

		// Delete the test user after the tests
		// after(async () => {
		// 	await Game.findByIdAndDelete(createdGameId);
		// });

		it('finds a favorite by id and deletes', async () => {
			try {
				const response = await request(app).delete(`/favorites/${favoriteId}`);

				expect(response.status).to.equal(200);
			} catch (error) {
				console.error('Test error:', error);
				throw error;
			}
		});
	});
});
