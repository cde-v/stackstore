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

orderSchema.virtual('formattedShipDate').get(function(){
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = new Date(this.shipDate).getDate();
  var monthIndex = new Date(this.shipDate).getMonth();
  var year = new Date(this.shipDate).getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
})

orderSchema.virtual('formattedOrderDate').get(function(){
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = new Date(this.orderDate).getDate();
  var monthIndex = new Date(this.orderDate).getMonth();
  var year = new Date(this.orderDate).getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
})

mongoose.model('Order', orderSchema);
