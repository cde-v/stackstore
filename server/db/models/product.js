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
  stock: {
    type: Number,
    required: true
  },
  prevOrders: {
    type: Number,
    default: 0
  },
  sizes: {
    type: [Number],
    required: true
  },
  availability: {
    type: Boolean,
    default: false,
    required: true
  },
  tags: {
    type: [String]
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviews'
  }],
  description: String
});

// Product.virtual('rating')
//   .get(function({

//     });

db.model('Product', productSchema);
