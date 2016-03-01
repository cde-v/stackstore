'use strict';

var router = require('express').Router();
var Product = require('mongoose').model('Product');

module.exports = router;

//------ GET ALL ITEMS
router.get('/', function (req, res, next) {
	Product.find(req.query)
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else res.send(data);
	}, err=>{
		next(err)
	})
});

//------ GET ONE ITEM ENTRY
router.get('/:itemId', function (req, res, next) {
	Product.find({itemId: req.params.itemId})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else res.send(data[0]);
	}, err=>{
		next(err)
	})
});

//------ CREATE ITEM ENTRY
router.post('/', function(req, res, next){
	Product.create(req.body)
	.then(data=>{
		res.status(201).send(data)
	}, err=>{
		next(err)
	})
})

//------ UPDATE ITEM ENTRY
router.put('/:itemId', function(req, res, next){
	Product.find({itemId: req.params.itemId})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else {
			for(var key in req.body){
				data[0][key] = req.body[key];
			}
			data[0].save()
			res.send(data[0])
		}
	}, err=>{
		next(err)
	})
})

//------ DELETE ITEM ENTRY
router.delete('/:itemId', function(req, res, next){
	Product.find({itemId: req.params.itemId})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else {
			data[0].remove()
			res.send(data[0])
		}
	}, err=>{
		next(err)
	})
})