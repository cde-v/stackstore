// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Members Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});


	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 401 response', function (done) {
			guestAgent.get('/api/members/secret-stash')
				.expect(401)
				.end(done);
		});

	});


	describe('products', function () {

		var product;

		before(function (done) {
			Product.create({
				itemId: {
					type: String,
					unique:true,
					required: true
				},
				brand: {
					type: String,
					required: true
				},
				name: {
					type: String,
					required: true
				},
				images: {
					type: [String]
				},
				price: {
					type: Number,
					required: true
				},
				stock: {
					type: Number,
					required: true
				},
				prevOrders: {
					type: Number,
					default:0
				},
				sizes: {
					type: [Number],
					required: true
				},
				availability: {
					type: Boolean,
					default: false,
					required: true
				},
				tags: {
					type: [String]
				},
				// reviews: [{
				// 	type: mongoose.Schema.Types.ObjectId,
				// 	ref: 'Reviews'
				// }],
				description: 'Made of pure gold'
			}, function (err, a) {
				if (err) return done(err);
				
				done();
			});
		});

		

		it('GET all', function (done) {
			agent
			.get('/api/products')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(2);
				done();
			});
		});

		var createdBook;

		xit('POST one', function (done) {
			agent
			.post('/api/books')
			.send({
				title: 'Book Made By Test',
				author: author._id,
				chapters: [chapter._id]
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('Book Made By Test');
				createdBook = res.body;
				done();
			});
		});
		
		xit('GET one', function (done) {
			agent
			.get('/api/books/' + createdBook._id)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal(createdBook.title);
				done();
			});
		});

		xit('GET one that doesn\'t exist', function (done) {
			agent
			.get('/api/books/123abcnotamongoid')
			.expect(404)
			.end(done);
		});
		
		xit('PUT one', function (done) {
			agent
			.put('/api/books/' + createdBook._id)
			.send({
				title: 'Book Updated By Test'
			})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('Book Updated By Test');
				done();
			});
		});

		xit('PUT one that doesn\'t exist', function (done) {
			agent
			.put('/api/books/123abcnotamongoid')
			.send({title: 'Attempt To Update Book Title'})
			.expect(404)
			.end(done);
		});
		
		xit('DELETE one', function (done) {
			agent
			.delete('/api/books/' + createdBook._id)
			.expect(204)
			.end(function (err, res) {
				if (err) return done(err);
				Book.findById(createdBook._id, function (err, b) {
					if (err) return done(err);
					expect(b).to.be.null;
					done();
				});
			});
		});

		xit('DELETE one that doesn\'t exist', function (done) {
			agent
			.delete('/api/books/123abcnotamongoid')
			.expect(404)
			.end(done);
		});

		xit('GET with query string filter', function (done) {
			agent
			// remember that in query strings %20 means a single whitespace character
			.get('/api/books?title=Best%20Book%20Ever')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				done();
			});
		});
	});


	// describe('Authenticated request', function () {

	// 	var loggedInAgent;

	// 	var userInfo = {
	// 		email: 'joe@gmail.com',
	// 		password: 'shoopdawoop'
	// 	};

	// 	beforeEach('Create a user', function (done) {
	// 		User.create(userInfo, done);
	// 	});

	// 	beforeEach('Create loggedIn user agent and authenticate', function (done) {
	// 		loggedInAgent = supertest.agent(app);
	// 		loggedInAgent.post('/login').send(userInfo).end(done);
	// 	});

	// 	it('should get with 200 response and with an array as the body', function (done) {
	// 		loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
	// 			if (err) return done(err);
	// 			expect(response.body).to.be.an('array');
	// 			done();
	// 		});
	// 	});

	// });

});
