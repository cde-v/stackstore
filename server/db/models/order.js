var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  shipAddress: {
    type: String
  },
  billAddress:{
    type: String
  },
  items: [{
    itemId: String,
    quantity: Number,
    brand: String,
    name: String,
    price: Number,
    size: Number
  }],
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
