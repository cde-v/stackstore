// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var app = require('../../../server/app');
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs')

describe('Products Route', function () {
	
	function dropAll () {
		return Product.remove({})
		
	}

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	describe('products', function () {

		var shoe1 = {
			itemId: 'ADYB750B',
			brand:'Adidas',
			style:'sneaker',
			name:'Yeezy Boost 750',
			images: ['img1','img2'],
			price: 500,
			prevOrders: 2,
			sizes: {
				6:3,
				7:3,
				8:3,
			},
			tags:['Yeezy','black','Sneaker'],
			description: 'Made of pure gold'
		};

		var shoe2 = {
			itemId: 'ADYB350T',
			brand:'Adidas',
			style:'sneaker',
			name:'Yeezy Boost 350',
			images: ['img1','img2', 'img3'],
			price: 300,
			prevOrders: 4,
			sizes: {
				'6':3,
				'7':3,
				'8':3,
			},
			tags:['Yeezy','Tan','Sneaker'],
			description: 'Made of pure gold'
		};

		var shoe3 = {
			itemId: 'NKSBDMC',
			brand:'Nike',
			style:'sneaker',
			name:'SB Dunks Money Cat',
			images: ['img1','img2', 'img3'],
			price: 200,
			prevOrders: 4,
			sizes: {
				'6':3,
				'7':3,
				'8':3,
			},
			tags:['SB','Cats','Sneaker'],
			description: 'Cats Cats Cats'
		};

		var createdShoe

		beforeEach(function (done) {
			Product.create(shoe1, function (err, shoe) {
				if (err) return done(err);
				createdShoe = shoe;
				done();
			});
		});
		beforeEach(function (done) {
			Product.create(shoe2, function (err, a) {
				if (err) return done(err);
				done();
			});
		});

		afterEach('Clear test database', function (done) {
			Product.remove({})
			.then(function(){
				done()
			})
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

		it('GET one', function (done) {
			agent
			.get('/api/products/ADYB750B')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('Yeezy Boost 750');
				done();
			});
		});

		it('GET with query string filter', function (done) {
			agent
			// remember that in query strings %20 means a single whitespace character
			.get('/api/products?name=Yeezy%20Boost%20750')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				expect(res.body[0].name).to.equal('Yeezy Boost 750');
				done();
			});
		});

		it('POST one', function (done) {
			agent
			.post('/api/products/')
			.send(shoe3)
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('SB Dunks Money Cat');
				done();
			});
		});
		

		it('GET one that doesn\'t exist', function (done) {
			agent
			.get('/api/products/123abcnotamongoid')
			.expect(404)
			.end(done);
		});
		
		it('PUT one', function (done) {
			agent
			.put('/api/products/ADYB750B')
			.send({prevOrders:5})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.prevOrders).to.equal(5);
				console.log(res.body.sizes)
				done();
			});
		});

		it('PUT UPDATE size', function (done) {
			agent
			.put('/api/products/ADYB750B')
			.send({sizes:{6:7}})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.sizes[6]).to.equal(7);
				console.log(res.body.sizes)
				done();
			});
		});

		it('PUT one that doesn\'t exist', function (done) {
			agent
			.put('/api/products/123abcnotamongoid')
			.send({name: 'Attempt To Update Stock'})
			.expect(404)
			.end(done);
		});
		
		it('DELETE one', function (done) {
			agent
			.delete('/api/products/ADYB750B')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				Product.find({}, function (err, shoe) {
					if (err) return done(err);
					expect(shoe).to.be.instanceof(Array);
					expect(shoe).to.have.length(1);
					done();
				});
			});
		});

		it('DELETE one that doesn\'t exist', function (done) {
			agent
			.delete('/api/products/123abcnotamongoid')
			.expect(404)
			.end(function (err, res) {
				if (err) return done(err);
				Product.find({}, function (err, shoe) {
					if (err) return done(err);
					expect(shoe).to.be.instanceof(Array);
					expect(shoe).to.have.length(2);
					done();
				});
			});
		});

	});

});
