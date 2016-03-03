var expect = require('chai').expect;
var Promise = require('bluebird');
var Order = require('mongoose').model('Order')
var request = require('supertest');
var app = require('../../../server/app');
var agent = request.agent(app);

describe('Order Route:', function() {
  before(function() {
    Order.remove({}).exec();
  });

  describe('GET /orders', function() {
    /**
     * Save an Order in the database using our model and then retrieve it
     * using the GET /orders route
     *
     */
    it('returns orders if there are any in the DB', function(done) {
      Order.create({
        orderStatus: 'created'
      }).then(function() {
        agent
          .get('/api/orders')
          .expect(200)
          .expect(function(res) {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body[0].orderStatus).to.equal('created');
          })
          .end(done);
      }).then(null, done);
    });
  });

  /**
   * Search for orders by ID
   */
  describe('GET /orders/:orderId', function() {
    var id;
    // create another order for test
    before(function(done) {

      var order = new Order({
        orderStatus: 'created'
      });

      order.save().then(function(savedOrder) {
        id = savedOrder._id;
        done();
      }, done);

    });

    it('returns an order by id', function(done) {
      agent
        .get('/api/orders/' + id)
        .expect(function(res) {

          if (typeof res.body === 'string') {
            res.body = JSON.parse(res.body);
          }
          expect(res.body._id).to.equal(id.toString());
        })
        .end(done);
    });

    it('returns a 500 if the ID does not exist', function(done) {
      agent
        .get('/api/orders/' + '12345')
        .expect(500)
        .end(done);
    });
  });

  /**
   * Creates new orders
   */
  describe('POST /orders', function() {

    it('creates a new order', function(done) {
      agent
        .post('/api/orders')
        .send({
          orderStatus: 'created'
        })
        .expect(201)
        .expect(function(res) {
          expect(res.body._id).to.not.be.an('undefined');
          expect(res.body.orderStatus).to.equal('created');
        })
        .end(done);
    });
  });


  describe('PUT /orders/:id', function() {

    var id;

    before(function(done) {

      Order.findOne({
        orderStatus: 'created'
      }).then(function(order) {
        id = order._id;
        done();
      }).then(null, done);
    });

    /**
     * Test the updating of an order
     */
    it('updates an order', function(done) {

      agent
        .put('/api/orders/' + id)
        .send({
          orderStatus: 'shipped'
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body._id).to.not.be.an('undefined');
          expect(res.body.orderStatus).to.equal('shipped');
        })
        .end(done);
    });

    it('saves updates to the DB', function(done) {
      Order.findOne({
        orderStatus: 'shipped'
      }).exec().then(function(order) {
        expect(order).to.exist;
        expect(order.orderStatus).to.equal('shipped');
        done();
      }).then(null, done);
    });
  });

  describe('DELETE /orders/:id', function() {
    var id;
    before(function(done) {

      var order = new Order({
        orderStatus: 'created'
      });

      order.save().then(function(savedOrder) {
        id = savedOrder._id;
        done();
      }, done);
    });
    it('deletes one order', function(done) {
      agent
        .delete('/api/orders/' + id)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          Order.findById(id, function(err, o) {
            if (err) return done(err);
            expect(o).to.be.null;
            done();
          });
        });
    });

    it('deletes one that doesn\'t exist', function(done) {
      agent
        .delete('/orders/123abcnotamongoid')
        .expect(404)
        .end(done);
    });

  });
});