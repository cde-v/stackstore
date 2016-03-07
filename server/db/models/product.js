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
    5: 0,
    5.5: 0,
    6: 0,
    6.5: 0,
    7: 0,
    7.5: 0,
    8: 0,
    8.5: 0,
    9: 0,
    9.5: 0,
    10: 0,
    10.5: 0,
    11: 0,
    11.5: 0,
    12: 0,
    12.5: 0,
    13: 0,
    13.5: 0,
    14: 0,
    14.5: 0,
    15:0
  },
  tags: {
    type: [String]
  },
  description: String
});



mongoose.model('Product', productSchema);
