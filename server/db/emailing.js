var mongoose = require('mongoose');
require('./models/order');
require('./models/user');
var User = mongoose.model('User');

var orderSchema = mongoose.schema('orderSchema');

var api_key = 'key-e5180eb6833845a471dd9dd0496aef0d';
var domain = 'sandbox64f76bec24084fa7895b7f199fb60b28.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

var data = {
  from: 'Kick Stack <kickstackorders@sandbox64f76bec24084fa7895b7f199fb60b28.mailgun.org>',
  to: '',
  subject: '',
  text: ''
};

orderSchema.pre('save', function(next) {
  var self = this;
  console.log("hitting emailing.js pre save hook");
  if(self.isModified('status')) {
    User.findOne({ _id: self.userId })
      .then(function(user) {
        data.to = user.email;
        data.subject = 'Kick Stack Order' + self.status;
        data.text = 'Good News' + user.firstName + " " + user.lastName + ", \n" + "Your order has been " + self.status + " as requested";
      });
  }
  console.log(data);
});

mailgun.messages().send(data, function(error, body) {
  if(error) console.err("Email error");
  else console.log("Email sent" + body);
});
