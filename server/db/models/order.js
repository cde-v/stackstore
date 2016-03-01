var mongoose = require('mongoose');
var User = require('./user');
var Cart = require('./cart');

var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  orderStatus: {
    type: String,
    enum: ['created', 'processing', 'shipped', 'fulfilled', 'canceled', 'error']
  },
  returnStatus: {
    type: String,
    enum: ['created', 'received', 'canceled', 'refunded']
  },
  shipDate: {
    type: Date,
    default: Date.now
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
});

orderSchema.methods.changeOrderStatus = function(status) {
  this.orderStatus = status;

  if (status === 'shipped') {
    this.shipDate = Date.now();
  }


orderSchema.methods.changeReturnStatus = function(status) {
  this.returnStatus = status;
}


orderSchema.statics.findOneOrder = function(id) {
  return mongoose
  .model('Order')
  .findById(id);
}


module.exports = mongoose.model('Order', orderSchema);
