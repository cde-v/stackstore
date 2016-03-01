'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var shortid = require('shortid');
// var db = require('../db');
var userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: shortid.generate
  },
  photoUrl: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  shipAddress: {
    type: String
  },
  billAddress: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  payment_info: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  salt: {
    type: String
  },
  twitter: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String,
    unique: true,
  },
  facebook: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String,
    unique: true,
  },
  google: {
    id: String,
    username: String,
    email: String,
    token: String,
    tokenSecret: String,
    unique: true
  },
  currentCart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  previousOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  paymentProfiles: [{
    cc: { type: String, required: true}
  }]
});
mongoose.model('User', userSchema);
// // method to remove sensitive information from user objects before sending them out
// schema.methods.sanitize = function() {
//   return _.omit(this.toJSON(), ['password', 'salt']);
// };
// // generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// // are all used for local authentication security.
// var generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64');
// };
// var encryptPassword = function(plainText, salt) {
//   var hash = crypto.createHash('sha1');
//   hash.update(plainText);
//   hash.update(salt);
//   return hash.digest('hex');
// };
// schema.pre('save', function(next) {
//   if(this.isModified('password')) {
//     this.salt = this.constructor.generateSalt();
//     this.password = this.constructor.encryptPassword(this.password, this.salt);
//   }
//   next();
// });
// schema.statics.generateSalt = generateSalt;
// schema.statics.encryptPassword = encryptPassword;
// schema.method('correctPassword', function(candidatePassword) {
//   return encryptPassword(candidatePassword, this.salt) === this.password;
// });
// mongoose.model('User', schema);
