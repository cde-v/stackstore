//using router instead of app
//creating req.params for userid

var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
module.exports = router;
// var Order = require('mongoose').model('Order');

router.param('id', function(req, res, next, id) {
  Cart.findById(id).exec()
    .then(function(cart) {
      if (!cart) throw HttpError(404);
      req.cart = cart;
      next();
    })
    .then(null, next);
});

router.get('/', function(req, res) {
  Cart.find({})
    .then(results => res.json(results))
    .catch(console.error);
});

router.get('/:id', function(req, res) {
  res.json(req.cart);
});

router.post('/', function(req, res) {
  Cart.create({}).then(result => res.json(result));
});

//flesh out checkout function
router.post('/:id/checkout', function(req, res) {
  // Order.create({ /*something in here*/ }).then(result => res.json(result));
});

router.put('/:id/:itemId', function(req, res) {
	console.log("hi", req.body);
  res.json(req.cart.editQuantity(req.params.itemId, req.body.quantity));
});

router.delete('/:id', function(req, res) {
  req.cart.items = [];

  res.json(req.cart.save());
});

router.delete('/:id/:itemId', function(req, res) {
  Cart.findOne({ _id: req.params.id })
    .then(result => res.json(result.removeItem(req.params.itemId)))
    .catch(err => res.sendStatus(404));
});
