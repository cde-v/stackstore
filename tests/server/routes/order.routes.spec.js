order.routes.spec.js

var expect = require('chai').expect;
var Promise = require('bluebird');
var order = require('../../../server/app/routes/order.js');

describe('Order Route:', function () {


 /**
 * Save an Order in the database using our model and then retrieve it
 * using the GET /orders route
 *
 */
	 it('returns an order if there is one in the DB', function (done) {

	 	var order = new Order({
	 		orderStatus: 'Created',     
	 	});

	 	order.save().then(function () {

	 		agent
	 		.get('/orders')
	 		.expect(200)
	 		.expect(function (res) {
	 			expect(res.body).to.be.an.instanceOf(Array);
	 			expect(res.body[0].orderStatus).to.equal('Created');
	 		})
	 		.end(done);

	 	}).then(null, done);

	 });

	})