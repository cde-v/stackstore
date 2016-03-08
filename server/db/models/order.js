var mongoose = require('mongoose');

var api_key = 'key-e5180eb6833845a471dd9dd0496aef0d';
var domain = 'sandbox64f76bec24084fa7895b7f199fb60b28.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
var data = {
  from: 'Kick Stack <kickstackorders@sandbox64f76bec24084fa7895b7f199fb60b28.mailgun.org>',
  to: '',
  subject: '',
  text: ''
};

var orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shipAddress: {
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  billAddress: {
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

  if(status === 'Shipped') {
    this.shipDate = Date.now();
  }
  return this.save();
}

function date(type) {
  return function() {
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

orderSchema.pre('save', function(next) {
  var User = mongoose.model('User');
  var self = this;
  
  console.log("hitting emailing.js pre save hook");
  console.log("self" + self);
  console.log(self.isModified('status'));
  if(self.isModified('status')) {
    User.findOne({ _id: self.userId })
      .then(function(user) {
        console.log("user" + user);
        data.to = user.email;
        data.subject = 'Kick Stack Order' + self.status;
        data.text = 'Good News' + user.firstName + " " + user.lastName + ", \n" + "Your order has been " + self.status + " as requested";
        mailgun.messages().send(data, function(error, body) {
          if(error) console.err("Email error");
          else console.log("Email sent" + body);
        });
        next();
      })
      .then(null, next);
  }
  console.log("end data" + data);
  next();
});

mongoose.model('Order', orderSchema);
