'use strict';

var mongoose = require('mongoose');

var db = require('../../db');


var productSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  price: {
    type: Number,
    required: true
  },
  prevOrders: {
    type: Number,
    default: 0
  },
  sizes:{},
  tags: {
    type: [String]
  },
  description: String
});

// Product.virtual('rating')
//   .get(function({

//     });

mongoose.model('Product', productSchema);
