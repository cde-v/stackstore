//using router instead of app
//creating req.params for userid

var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
module.exports = router;
var Order = require('mongoose').model('Order');

router.param('id', function(req, res, next, id) {
  Cart.findById(id).exec()
    .then(function(cart) {
      if (!cart) throw HttpError(404);
      req.cart = cart;
      next();
    })
    .then(null, function(err) {
      res.sendStatus(500);
    });
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
  Cart.create({}).then(result => {
    result.save();
    res.json(result);
  });
});

//flesh out checkout function
router.post('/:id/checkout', function(req, res) {
  // Order.create({ /*something in here*/ }).then(result => res.json(result));
});

router.put('/:id/:itemId', function(req, res) {
  res.json(req.cart.editQuantity(req.params.itemId, req.body.quantity));
});

router.delete('/:id/:itemId', function(req, res) {
  req.cart.removeItem(req.params.itemId);
  res.json(req.cart);
});

router.delete('/:id', function(req, res) {
  req.cart.items = [];
  req.cart.save();
  res.json(req.cart);
});
