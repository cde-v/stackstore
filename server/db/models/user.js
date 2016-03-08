'use strict';

var crypto = require('crypto');
var _ = require('lodash');

var mongoose = require('mongoose');
require('./order');
require('./cart');
require('./review');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');
var Review = mongoose.model('Reviews');

var userSchema = new mongoose.Schema();

userSchema.static('generateSalt', generateSalt);
userSchema.static('encryptPassword', encryptPassword);
userSchema.method('correctPassword', correctPassword);
userSchema.method('sanitize', sanitize);
userSchema.method('getUserReviews', getUserReviews);
userSchema.method('getUserOrders', getUserOrders);
userSchema.method('toggleAdmin', toggleAdmin);
userSchema.method('toggleNeedsPasswordReset', toggleNeedsPasswordReset);
userSchema.method('updatePW', updatePW);
userSchema.pre('save', preSave);

userSchema.add({ email: { type: String } });
userSchema.add({ password: { type: String } });
userSchema.add({ salt: { type: String } });
userSchema.add({ lastName: { type: String } });
userSchema.add({ firstName: { type: String } });
userSchema.add({ photoUrl: { type: String, default: '#' } });
userSchema.add({ shipAddress: { type: String } });
userSchema.add({ phoneNumber: { type: String } });
userSchema.add({ twitter: { id: String, username: String, token: String, tokenSecret: String } });
userSchema.add({ facebook: { id: String, username: String, token: String, tokenSecret: String } });
userSchema.add({ google: { id: String, username: String, token: String, tokenSecret: String } });
userSchema.add({ currentCart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' } });
userSchema.add({ isAdmin: { type: Boolean, default: false } });
userSchema.add({ needsPasswordReset: { type: Boolean, default: false } });

function getUserOrders() {
  /*jshint validthis:true */
  return Order
    .find({ user: this._id });
}

function getUserReviews() {
  /*jshint validthis:true */
  return Review
    .find({ author: this._id });
}

function toggleAdmin() {
  /*jshint validthis:true */
  this.isAdmin = !this.isAdmin;
  return this.save();
}

function toggleNeedsPasswordReset() {
  /*jshint validthis:true */
  this.needsPasswordReset = !this.needsPasswordReset;
  return this.save();
}

function updatePW(newPW) {
  /*jshint validthis:true */
  this.password = newPW.password;
  this.needsPasswordReset = false;
  return this.save();
}

// remove sensitive information from user objects before sending
function sanitize() {
  /*jshint validthis:true */
  return _.omit(this.toJSON(), ['password', 'salt']);
}

// local authentication security
function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
}

// local authentication security
function encryptPassword(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
}

// local authentication security
function correctPassword(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
}

// local authentication security
function preSave(next) {
  if(this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  if(!this.currentCart) {
    Cart.create({}).then(cart => {
      this.currentCart = cart;
      next();
    });
  } else next();

}

mongoose.model('User', userSchema);
