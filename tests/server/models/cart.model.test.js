var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

require('../../../server/db/models');

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Cart = require('mongoose').model('Cart');
var Product = require('mongoose').model('Product');
var Promise = require('bluebird');


xdescribe('Cart', function(){
	var p1 = Product.create({
		          itemId:"1",
		          brand:"shoe",
		          name:"shoes",
		          price:300,
		          stock:2,
		          availability:true,
		          sizes: [1,2]
		        });

	var p2 = Product.create({
		          itemId:"2",
		          brand:"shoe",
		          name:"shoes",
		          price:200,
		          stock:6,
		          availability:true,
		          sizes: [1,2,2,2,2,2]
		        });

	var p3 = Product.create({
		          itemId:"3",
		          brand:"shoe",
		          name:"shoes",
		          price:100,
		          stock:5,
		          availability:false,
		          sizes: [1,2,2,2,2]
		        });

	var cart = Cart.create({});

	before(function(done){
		Promise.all([p1, p2, p3, cart]).then(results => {
			results[3].items = [
				{product:results[0]._id, quantity:1}, 
				{product:results[1]._id, quantity:1},
				{product:results[2]._id, quantity:1}
				];
			done();
		});
	});

	it('has an array list', function(done){
		expect(cart.items).to.be.an.instanceOf(Array);
		expect(cart.items).to.have.length(3);
		done();
	});

	it('can edit the quantity of a product', function(done){
		cart.editQuantity(p1._id, 3);

		expect(cart.items[0].quantity).to.be(3);
		done();
	});

	it('can remove a product from the cart', function(done){
		cart.removeItem(p1._id);

		expect(cart.items.length).to.be(2);
		done();
	});

	it('can not remove something that is not there', function(done){
		cart.removeItem(p1._id);

		expect(cart.items.length).to.be(2);
		done();
	});

	it('can calculate a total price of the cart', function(done){
		expect(cart.getTotal()).to.be(300);
		done();
	});
});