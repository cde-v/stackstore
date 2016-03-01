'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
module.exports = router;


router.param('orderId', function (req, res, next, id) {
  mongoose.model('Order')
  .findById(id)
  .then(function (order) {
    if(!order) throw new Error('not found!');
    req.order = order;
    next();
  })
  .then(null, next);
});

//get single order
router.get('/orders/:orderId', function (req, res, next) {
  req.order.getOneOrder(req.params.orderId)
  .then(function (order) {
    res.json(order);
  })
  .then(null, next);
});

//get all orders
router.get('/orders', function (req, res, next) {
  mongoose.model('order')
  .getAllOrders()
  .then(function (orders) {
    res.json(orders);
  })
  .then(null, next);
});

//create an order
router.post('/orders', function (req, res, next){
  mongoose.model('order')
  .create(req.body)
  .then(function (newOrder) {
    res.status(201).json(newOrder);
  })
  .then(null, next);
})

//delete order
router.delete('/orders/:orderId', function (req, res, next){
  req.order.remove()
  .then(function () {
    res.status(204).end();
  })
  .then(null, next);
})

//update order status
router.put('/orders/:orderId', function (req, res, next){
  req.order.changeOrderStatus(req.body.orderStatus)
  .then(function(order){
    res.json(order);
  })
  .then(null, next);
})

