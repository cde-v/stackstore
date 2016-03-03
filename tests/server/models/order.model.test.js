'use strict';
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

require('../../../server/db/models');

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Order = require('mongoose').model('Order');
var Promise = require('bluebird');

describe('Order Model:', function() {

  before(function() {
    Order.remove({}).exec();
  });


  describe('statics', function() {
    var id;
    beforeEach(function() {
      return Order.create({
        orderStatus: 'processing'
      }).then(function(order) {
        id = order._id;
      })
    });

    describe('getOneOrder', function() {

      it('gets one order by id from the database', function(done) {
        Order.getOneOrder(id)
          .then(function(order) {
            expect(order.orderStatus).to.equal('processing');
            done();
          })
          .then(null, done); // catch test errors
      });

    });

    describe('getAllOrders', function() {

      it('gets all orders in the database', function(done) {
        Order.getAllOrders()
          .then(function(orders) {
            expect(orders).to.have.length(2);
            done();
          })
          .then(null, done); // catch test errors
      });
    });
  });

  describe('methods', function() {

    var order;

    beforeEach(function(done) {
      order = new Order({
        orderStatus: 'created'
      });
      order.save(done);
    });

    it('has an instance method change order status', function(done) {
      Order.findOne({
        orderStatus: 'created'
      }).exec().then(function(order) {
        expect(order.orderStatus).to.equal('created');
        order.changeOrderStatus('shipped')
          .then(function(order) {
            expect(order.shipDate).to.not.be.an('undefined');
            expect(order.orderStatus).to.equal('shipped');
          })
        done();
      }).then(null, done);
    });
  });
});
