'use strict';
<<<<<<< HEAD
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
    type: [Boolean],
    default: [false, false, false, false, false],
    required: true
  },
  body: {
    type: String,
    required: true
  }
});
module.exports = db.model('Reviews', reviewSchema);
=======

var mongoose = require('mongoose');

var db = require('../../db');

var reviewSchema = new mongoose.Schema({
	product:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	rating: {
		type: [Boolean],
		default:[false,false,false,false,false]
		required: true
	},
	body: {
		type: String,
		required: true
	}
});

module.exports = db.model('Reviews', reviewSchema);
>>>>>>> master
