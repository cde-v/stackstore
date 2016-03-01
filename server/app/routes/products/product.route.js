'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

module.exports = router;

//------ GET ALL ITEMS
router.get('/', function (req, res, next) {
	mongoose.model('Product')
	.find(req.query)
	.then(data=>{
		res.send(data);
	}, err=>{
		res.sendStatus(404);
	})
});

//------ GET ONE ITEM ENTRY
router.get('/:itemId', function (req, res, next) {
  mongoose.model('Product')
  .find({itemId: req.params.itemId})
  .then(data=>{
    res.send(data[0]);
  }, err=>{
  	res.sendStatus(404);
  })
});

//------ CREATE ITEM ENTRY
router.post('/', function(req, res, next){
	mongoose.model('Product')
	.create(req.body)
	.then(data=>{
		res.status(201).send(data)
	})
})

//------ UPDATE ITEM ENTRY
roiuter.put('/:itemId', function(req, res, next){
	mongoose.model('Product')
	.find({itemId: req.params.itemId})
	.then(data=>{
		for(var key in req.body){
			data[0][key] = req.body[key];
		}
		data[0].save()
		res.send(data[0])
	}, err=>{
		res.sendStatus(404)
	})
})

//------ DELETE ITEM ENTRY
roiuter.delete('/:itemId', function(req, res, next){
	mongoose.model('Product')
	.find({itemId: req.params.itemId})
	.then(data=>{
		data[0].remove()
		res.send(data[0])
	}, err=>{
		res.sendStatus(404)
	})
})