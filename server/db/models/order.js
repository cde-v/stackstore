var mongoose = require('mongoose');
var Product = require('./product');

var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    _id: false
  }]
  orderStatus: {
    type: String,
    enum: ['created', 'processing', 'shipped', 'fulfilled', 'canceled', 'error', 'disputed']
  },
  returnStatus: {
    type: String,
    enum: ['created', 'received', 'canceled', 'refunded']
  },
  shipDate: {
    type: Date
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
});

orderSchema.methods.changeOrderStatus = function(status) {
  this.orderStatus = status;

  if (status === 'shipped') {
    this.shipDate = Date.now();
  }
  return this.save();
}

orderSchema.statics.getOneOrder = function(id) {
  return mongoose
    .model('Order')
    .findById(id);
}

orderSchema.statics.getAllOrders = function() {
  return mongoose
    .model('Order').find({});
}

mongoose.model('Order', orderSchema);
