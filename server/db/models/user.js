'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var shortid = require('shortid');
var db = require('../db');
var userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: shortid.generate
  },
  photoUrl: {
    type: String
    // default profile pic, no images currently to point to
    // default: '/images/default-photo.jpg' 
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
  paymentProfiles: [{
    ccCardholder: { type: String, required: true },
    ccType: { type: String, required: true },
    ccNum: { type: String, required: true },
    ccBillingAddress: { type: String, required: true }
  }]
});

userSchema.virtual('fullname').get(function() {
  return this.firstName + " " + this.lastName;
});

userSchema.methods.getUserOrders = function() {
  return mongoose
  .model('Order')
  .find({user: this._id})
  .populate('user');
};


// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize = function() {
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
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  next();
});
userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;
userSchema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);
