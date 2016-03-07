'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('mongoose').model('Order');
module.exports = router;


router.param('orderId', function(req, res, next, id) {
  Order.findById(id)
    .then(function(order) {
      if (!order) throw new Error('not found!');
      req.order = order;
      next();
    })
    .then(null, next);
});

//get single order
router.get('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId)
    .then(function(order) {
      res.json(order);
    })
    .then(null, next);
});

//get all orders
router.get('/', function(req, res, next) {
  Order.find({})
    .then(function(orders) {
      res.json(orders);
    })
    .then(null, next);
});

//create an order
router.post('/', function(req, res, next) {
  Order.create(req.body)
    .then(function(newOrder) {
      res.status(201).json(newOrder);
    })
    .then(null, next);
})

//delete order
router.delete('/:orderId', function(req, res, next) {
  req.order.remove()
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
})

//update order status
router.put('/:orderId', function(req, res, next) {
  req.order.changeOrderStatus(req.body.status)
    .then(function(order) {
      res.json(order);
    })
    .then(null, next);
})
