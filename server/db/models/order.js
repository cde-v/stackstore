var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  shipAddress: { 
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  billAddress:{
    name: String,
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
    enum: ['Created', 'Processing', 'Shipped', 'Fulfilled', 'Canceled']
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
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

orderSchema.methods.changeOrderStatus = function(status) {
  this.status = status;

  if (status === 'Shipped') {
    this.shipDate = Date.now();
  }
  return this.save();
}

function date (type){
  return function(){
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];

    var day = new Date(this[type]).getDate();
    var monthIndex = new Date(this[type]).getMonth();
    var year = new Date(this[type]).getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
}

orderSchema.virtual('formattedOrderDate').get(date('orderDate'));
orderSchema.virtual('formattedShipDate').get(date('shipDate'));

mongoose.model('Order', orderSchema);
