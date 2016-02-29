'use strict';

var mongoose = require('mongoose');

var db = require('../../db');

var Product = new mongoose.Schema({
	
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
		default:0
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
	description: String
});

module.exports = db.model('Product', Product);