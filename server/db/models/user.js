(function() {
  'use strict';

  var crypto = require('crypto');
  var _ = require('lodash');

  var mongoose = require('mongoose');
  require('./order');
  require('./review');
  var Order = mongoose.model('Order');
  var Review = mongoose.model('Reviews');

  var userSchema = new mongoose.Schema();

  userSchema.static('generateSalt', generateSalt);
  userSchema.static('encryptPassword', encryptPassword);
  userSchema.method('correctPassword', correctPassword);
  userSchema.method('sanitize', sanitize);
  userSchema.method('getUserReviews', getUserReviews);
  userSchema.method('getUserOrders', getUserOrders);
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
  userSchema.add({ paymentProfiles: [{ ccCardholder: { type: String, required: true }, ccType: { type: String, required: true }, ccNum: { type: String, required: true }, ccBillingAddress: { type: String, required: true } }] });
  userSchema.add({ currentCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }] });
  userSchema.add({ isAdmin: { type: Boolean, default: false } });

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
    next();
  }

  mongoose.model('User', userSchema);

})();
