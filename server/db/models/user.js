'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var Order = require('./order');
var Review = require('./order');

var userSchema = new mongoose.Schema({});
userSchema.methods.getUserReviews = getUserReviews;
userSchema.methods.getUserOrders = getUserOrders;
userSchema.methods.sanitize = sanitize;
userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;
userSchema.methods.correctPassword = correctPassword;
userSchema.pre('save', preSave);

userSchema = ({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  photoUrl: {
    type: String
      // default profile pic, no images currently to point to
      // default: '/images/default-photo.jpg' 
  },
  shipAddress: {
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
    tokenSecret: String
  },
  facebook: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String
  },
  google: {
    id: String,
    username: String,
    email: String,
    token: String,
    tokenSecret: String
  },
  currentCart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  paymentProfiles: [{
    ccCardholder: { type: String, required: true },
    ccType: { type: String, required: true },
    ccNum: { type: String, required: true },
    ccBillingAddress: { type: String, required: true }
  }]
});

var getUserOrders = function() {
  return Order
    .find({ user: this._id });
};

var getUserReviews = function() {
  return Review
    .find({ user: this._id });
};

// method to remove sensitive information from user objects before sending them out
var sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

var correctPassword = function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
};

var preSave = function(next) {
  if(this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  next();
};

mongoose.model('User', userSchema);
