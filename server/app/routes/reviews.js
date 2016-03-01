'use strict';

var router = require('express').Router();
var Reviews = require('mongoose').model('Reviews');

module.exports = router;
//------ GET ALL REVIEWS BY USER
router.get('/user/:userId', function (req, res, next) {
	Reviews.find({user: req.params.userId})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else res.send(data);
	}, err=>{
		next(err)
	})
});

//------ GET ALL REVIEWS BY ITEM
router.get('/item/:itemId', function (req, res, next) {
	Reviews.find({itemId: req.params.itemId})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else res.send(data);
	}, err=>{
		next(err)
	})
});

//------ CREATE REVIEW
router.post('/', function(req, res, next){
	Reviews.create(req.body)
	.then(data=>{
		res.status(201).send(data)
	}, err=>{
		next(err)
	})
});

//------ EDIT REVIEW
router.put('/:id', function(req, res, next){
	Reviews.find({_id: req.params.id})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else {
			data.body = 
			data[0].save()
			res.send(data[0])
		}
	}, err=>{
		next(err)
	})
});

//------ DELETE REVIEW
router.delete('/:id', function(req, res, next){
	Reviews.find({_id: req.params.id})
	.then(data=>{
		if(!data.length) res.sendStatus(404);
		else {
			data[0].remove()
			res.send(data[0])
		}
	}, err=>{
		next(err)
	})
});