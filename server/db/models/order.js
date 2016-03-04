var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  shipAddress: { 
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  billAddress:{
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  items: [{
    itemId: String,
    quantity: Number,
    brand: String,
    name: String,
    price: Number,
    size: Number
  }],
  status: {
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
  this.status = status;

  if (status === 'shipped') {
    this.shipDate = Date.now();
  }
  return this.save();
}

mongoose.model('Order', orderSchema);
