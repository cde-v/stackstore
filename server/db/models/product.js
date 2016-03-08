'use strict';

var mongoose = require('mongoose');

var db = require('../../db');

var productSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  department: {
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
  sizes: {
    6: { type: Number, default: 0 },
    7: { type: Number, default: 0 },
    8: { type: Number, default: 0 },
    9: { type: Number, default: 0 },
    10: { type: Number, default: 0 },
    11: { type: Number, default: 0 },
    12: { type: Number, default: 0 },
    13: { type: Number, default: 0 },
    14: { type: Number, default: 0 },
    15: { type: Number, default: 0 }
  },
  tags: {
    type: [String]
  },
  description: String
});



mongoose.model('Product', productSchema);
