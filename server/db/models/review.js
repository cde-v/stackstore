'use strict';
var mongoose = require('mongoose');
var db = require('../../db');
var reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});
mongoose.model('Reviews', reviewSchema);

