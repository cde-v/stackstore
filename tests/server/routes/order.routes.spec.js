var expect = require('chai').expect;
var Promise = require('bluebird');
var order = require('../../../server/app/routes/order.js');

describe('Order Route:', function () {

	//mongoose.model('Order').remove().exec()

	describe('GET /orders', function () {
		 /**
		 * Save an Order in the database using our model and then retrieve it
		 * using the GET /orders route
		 *
		 */
		 it('returns an orders if there any in the DB', function (done) {
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
		});

	  /**
     * Search for orders by ID
     */
     describe('GET /orders/:orderId', function () {

     	var order;

        // create another order for test
        before(function (done) {

        	order = new Order({
        		orderStatus = "processing";
        	});

        	order.save().then(function () {
        		done();
        	}, done);

        });
    });

     	 /**
     * Creates new orders
     */
     describe('POST /orders', function () {

     	it('creates a new order', function (done) {
     		agent
     		.post('/orders')
     		.send({
     			orderStatus = "created"
     		})
     		.expect(200)
     		.expect(function (res) {
     			expect(res.body.order._id).to.not.be.an('undefined');
     			expect(res.body.order.orderStatus).to.equal('created');
     		})
     		.end(done);
     	});
     });


     describe('PUT /orders/:id', function () {

     	var article;

     	before(function (done) {

     		Article.findOne({
     			title: 'Awesome POST-Created Article'
     		}).exec().then(function (_article) {
     			article = _article;
     			done();
     		}).then(null, done);

     	});

        /**
         * Test the updating of an order
         */
         it('updates an order', function (done) {

         	agent
         	.put('/orders/' + order._id)
         	.send({
         		orderStatus: 'shipped'
         	})
         	.expect(200)
         	.expect(function (res) {
         		expect(res.body.order._id).to.not.be.an('undefined');
         		expect(res.body.order.orderStatus).to.equal('shipped');
         	})
         	.end(done);

         });

         it('saves updates to the DB', function (done) {
         	Order.findOne({
         		orderStatus: 'shipped'
         	}).exec().then(function (order) {
         		expect(order).to.exist;
         		expect(order.orderStatus).to.equal('shipped');
         		done();
         	}).then(null, done);

         });  
     });

describe('DELETE /orders/:id', function () {
	it('deletes one order', function (done) {
		agent
		.delete('/orders/' + order._id)
		.expect(204)
		.end(function (err, res) {
			if (err) return done(err);
			Order.findById(order._id, function (err, o) {
				if (err) return done(err);
				expect(o).to.be.null;
				done();
			});
		});
	});

	it('deletes one that doesn\'t exist', function (done) {
		agent
		.delete('/orders/123abcnotamongoid')
		.expect(404)
		.end(done);
	});

});
})