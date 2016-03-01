'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
module.exports = router;

router.get('/users/:userId/orders', function (req, res, next) {
  mongoose.model('Order')
  .findById(req.params.userId)
  .then(function (user) {
    return user.find({orders: orders})
  })
  .then(function(orders){
    res.send(orders);
  })
  .then(null, next);
});

router.get('/orders/:orderId', function (req, res, next) {
  req.order.findOneOrder(req.params.orderId)
  .then(function (order) {
    res.send(order);
  })
  .then(null, next);
});


